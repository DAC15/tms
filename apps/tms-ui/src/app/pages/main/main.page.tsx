import AdbIcon from '@mui/icons-material/Adb';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { logoutFromApp } from '@tms/ui-auth';
import {
  TaskCard,
  TaskForm,
  TaskFormValue,
  TasksListFilter,
} from '@tms/ui-components';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { AppStore, AppStoreState } from '../../store';
import { TasksSlice } from '../../store/tasks';

export function MainPage(): ReactNode {
  const state = useSelector((s: AppStoreState) => s);
  const [form, setForm] = useState<{
    view: 'create' | 'update' | undefined;
    taskId: number | undefined;
    value: TaskFormValue | undefined;
  }>({ view: undefined, taskId: undefined, value: undefined });

  useEffect(() => {
    AppStore.dispatch(TasksSlice.actions.filterTasks({}));
  }, []);

  const clearForm = () =>
    setForm({
      view: undefined,
      taskId: undefined,
      value: undefined,
    });

  return (
    <div className="relative bg-slate-50">
      <div className="sticky top-0 z-[100]">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar className="gap-4" disableGutters>
              <AdbIcon className="flex mr-1" />
              <Avatar className="ml-auto bg-white text-blue-900 font-bold">
                {state.auth
                  .user!.fullName.split(' ')
                  .map((el) => el.at(0))
                  .join('')}
              </Avatar>
              <IconButton
                className="text-white"
                aria-label="logout"
                size="large"
                onClick={() => logoutFromApp()}>
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </div>

      <Container maxWidth="xl">
        <div className="flex items-start gap-4 py-10">
          <AnimatePresence>
            <motion.div layout className="w-full flex flex-col gap-4">
              <div className="bg-white p-4 rounded-lg">
                <TasksListFilter
                  filterChange={(filter) =>
                    AppStore.dispatch(
                      TasksSlice.actions.filterTasks({
                        filterByCompleted: filter.byCompleted,
                        filterByTerm: filter.byTerm,
                      })
                    )
                  }
                />
              </div>
              <div className="bg-white p-4 rounded-lg flex flex-col gap-2">
                <div className="flex justify-end">
                  <Button
                    variant="text"
                    onClick={() =>
                      setForm({
                        view: 'create',
                        taskId: undefined,
                        value: { title: '', description: '' },
                      })
                    }>
                    Create task
                  </Button>
                </div>
                <InfiniteScroll
                  dataLength={state.tasks.data.length}
                  next={() =>
                    AppStore.dispatch(TasksSlice.actions.loadMoreTasks())
                  }
                  hasMore={state.tasks.data.length < state.tasks.count}
                  loader={<LinearProgress />}
                  endMessage={
                    <p className="text-center italic text-slate-600 text-sm">
                      Those are all tasks
                    </p>
                  }>
                  <List component="nav">
                    {state.tasks.data.map((task) => (
                      <div key={task.id}>
                        <ListItem>
                          <TaskCard
                            onUpdate={() =>
                              setForm({
                                view: 'update',
                                taskId: task.id,
                                value: task,
                              })
                            }
                            className="p-1"
                            task={task}
                            onComplete={() =>
                              AppStore.dispatch(
                                TasksSlice.actions.patchTask({
                                  taskId: task.id,
                                  data: { completed: !task.completed },
                                })
                              )
                            }
                            onDelete={() =>
                              AppStore.dispatch(
                                TasksSlice.actions.deleteTask({
                                  taskId: task.id,
                                })
                              )
                            }
                          />
                        </ListItem>
                        <Divider />
                      </div>
                    ))}
                  </List>
                </InfiniteScroll>
              </div>
            </motion.div>

            {form?.view && form?.value && (
              <motion.div
                layout
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="sticky top-[100px] w-[480px] bg-white shrink-0 p-4 rounded-lg">
                {form.view === 'create' && (
                  <TaskForm
                    onCancel={() => clearForm()}
                    title="Create task"
                    submitLabel="Create task"
                    value={form.value}
                    onSubmit={(value) => {
                      AppStore.dispatch(
                        TasksSlice.actions.addTask({ data: value })
                      );
                      clearForm();
                    }}
                  />
                )}
                {form.view === 'update' && form.taskId && (
                  <TaskForm
                    onCancel={() => clearForm()}
                    title="Update task"
                    submitLabel="Save changes"
                    value={form.value}
                    onSubmit={(value) => {
                      AppStore.dispatch(
                        TasksSlice.actions.setTask({
                          taskId: form.taskId!,
                          data: { id: form.taskId!, completed: true, ...value },
                        })
                      );
                      clearForm();
                    }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
}
