import { Task } from '@tms/shared-models';

export interface TasksState {
  queryParams: {
    pageIndex: string;
    pageSize: string;
    filterByTerm: string;
    filterByCompleted: string;
  };
  count: number;
  data: Task[];
}

export function getInitialState(): TasksState {
  return {
    queryParams: {
      pageIndex: '1',
      pageSize: '50',
      filterByTerm: '',
      filterByCompleted: '',
    },
    count: 0,
    data: [],
  };
}
