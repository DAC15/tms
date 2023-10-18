import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

export interface TaskListFilter {
  byTerm: string;
  byCompleted: string;
}

interface Props {
  className?: string;
  filterChange: (value: TaskListFilter) => void;
}

export function TasksListFilter(props: Props): ReactNode {
  const [filter, setFilter] = useState<TaskListFilter>({
    byTerm: '',
    byCompleted: '',
  });

  useEffect(() => {
    props.filterChange(filter);
  }, [filter]);

  return (
    <div className={`${props.className} flex items-center gap-4 w-full`}>
      <TextField
        onChange={(e) => setFilter({ ...filter, byTerm: e.target.value })}
        className="w-full"
        label="Search by name or description"
        variant="filled"
      />
      <FormControl variant="filled" className="w-80">
        <InputLabel id="tasks-filter-by-state">Filter by state</InputLabel>
        <Select
          labelId="tasks-filter-by-state"
          value={filter.byCompleted}
          onChange={(e) =>
            setFilter({ ...filter, byCompleted: e.target.value })
          }>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">Completed</MenuItem>
          <MenuItem value="false">Incompleted</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
