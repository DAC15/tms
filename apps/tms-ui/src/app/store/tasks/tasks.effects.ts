import { createListenerMiddleware } from '@reduxjs/toolkit';
import { TasksProvider } from '@tms/ui-providers';
import { TasksSlice } from './tasks.slice';
import { TasksState } from './tasks.state';

export const TasksEffects = createListenerMiddleware<{
  tasks: TasksState;
}>();

TasksEffects.startListening({
  actionCreator: TasksSlice.actions.loadMoreTasks,
  effect: (_, { dispatch, getState }) => {
    TasksProvider.getMany(getState().tasks.queryParams)
      .then(([data, count]) =>
        dispatch(TasksSlice.actions.addTasks({ count, data }))
      )
      .catch(() => undefined);
  },
});

TasksEffects.startListening({
  actionCreator: TasksSlice.actions.filterTasks,
  effect: (_, { dispatch, getState }) => {
    TasksProvider.getMany(getState().tasks.queryParams)
      .then(([data, count]) =>
        dispatch(TasksSlice.actions.setTasks({ count, data }))
      )
      .catch(() => undefined);
  },
});

TasksEffects.startListening({
  actionCreator: TasksSlice.actions.addTask,
  effect: ({ payload: { data } }, { dispatch }) => {
    TasksProvider.create({ ...data, completed: true }).then((task) =>
      dispatch(
        TasksSlice.actions.setTask({
          taskId: 0,
          data: task,
          preventSave: true,
        })
      )
    );
  },
});

TasksEffects.startListening({
  actionCreator: TasksSlice.actions.patchTask,
  effect: ({ payload: { taskId, data } }) => {
    TasksProvider.patch(taskId, data);
  },
});

TasksEffects.startListening({
  actionCreator: TasksSlice.actions.setTask,
  effect: ({ payload: { taskId, data, preventSave } }) => {
    if (!preventSave) {
      TasksProvider.update(taskId, data);
    }
  },
});

TasksEffects.startListening({
  actionCreator: TasksSlice.actions.deleteTask,
  effect: ({ payload: { taskId } }) => {
    TasksProvider.delete(taskId);
  },
});
