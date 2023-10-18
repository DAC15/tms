import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from '@tms/ui-auth';
import { UiConfig } from '@tms/ui-config';
import { TasksSlice } from './tasks';
import { TasksEffects } from './tasks/tasks.effects';

export const AppStore = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    tasks: TasksSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend([TasksEffects.middleware]),
  devTools: UiConfig.devtools.enabled,
  enhancers: [],
});

export type AppStoreState = ReturnType<typeof AppStore.getState>;
