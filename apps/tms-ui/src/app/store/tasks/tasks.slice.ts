import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@tms/shared-models';
import { getInitialState, TasksState } from './tasks.state';

export const TasksSlice = createSlice({
  name: 'tasks',
  initialState: getInitialState(),
  reducers: {
    filterTasks: (
      state,
      action: PayloadAction<
        Partial<
          Pick<TasksState['queryParams'], 'filterByTerm' | 'filterByCompleted'>
        >
      >
    ) => ({
      ...state,
      queryParams: {
        ...state.queryParams,
        ...action.payload,
        pageIndex: '1',
      },
    }),
    loadMoreTasks: (state) => ({
      ...state,
      queryParams: {
        ...state.queryParams,
        pageIndex: `${Number(state.queryParams.pageIndex) + 1}`,
      },
    }),
    setTasks: (
      state,
      action: PayloadAction<{ count: number; data: Task[] }>
    ) => ({
      ...state,
      count: action.payload.count,
      data: [...action.payload.data],
    }),
    addTasks: (
      state,
      action: PayloadAction<{ count: number; data: Task[] }>
    ) => ({
      ...state,
      count: action.payload.count,
      data: [...state.data, ...action.payload.data],
    }),
    addTask: (
      state,
      action: PayloadAction<{ data: Pick<Task, 'title' | 'description'> }>
    ) => ({
      ...state,
      data: [
        { ...action.payload.data, id: 0, completed: false },
        ...state.data,
      ],
    }),
    patchTask: (
      state,
      action: PayloadAction<{ taskId: number; data: Partial<Task> }>
    ) => ({
      ...state,
      data: state.data.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, ...action.payload.data }
          : task
      ),
    }),
    setTask: (
      state,
      action: PayloadAction<{
        taskId: number;
        data: Task;
        preventSave?: boolean;
      }>
    ) => ({
      ...state,
      data: state.data.map((task) =>
        task.id === action.payload.taskId ? { ...action.payload.data } : task
      ),
    }),
    deleteTask: (state, action: PayloadAction<{ taskId: number }>) => ({
      ...state,
      data: state.data.filter((task) => task.id !== action.payload.taskId),
    }),
  },
});
