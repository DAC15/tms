import { Add } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { Task } from '@tms/shared-models';
import { ReactNode, useEffect, useState } from 'react';

export type TaskFormValue = Pick<Task, 'title' | 'description'>;

interface Props {
  title: string;
  submitLabel: string;
  value: TaskFormValue;
  onSubmit: (value: TaskFormValue) => void;
  onCancel: () => void;
}

export function TaskForm(props: Props): ReactNode {
  const [form, setForm] = useState<TaskFormValue>({
    title: '',
    description: '',
  });

  useEffect(() => {
    setForm(props.value);
  }, [props.value]);

  return (
    <div className="flex flex-col gap-4">
      <h2>{props.title}</h2>
      <div className="flex flex-col gap-3">
        <TextField
          required
          error={form.title.trim().length < 1}
          helperText="The task name should be at least 1 character length."
          className="w-full"
          value={form.title}
          label="Task Name"
          defaultValue="I want to"
          variant="filled"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <TextField
          label="Task description"
          multiline
          rows={4}
          error={form.description.trim().length < 1}
          helperText="The task description should be at least 1 character length."
          defaultValue="First thing i need to do.."
          variant="filled"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button onClick={() => props.onCancel()} variant="outlined">
          Cancel
        </Button>
        <Button
          disabled={
            !form.title.trim().length || !form.description.trim().length
          }
          onClick={() => props.onSubmit(form)}
          variant="outlined"
          startIcon={<Add />}>
          {props.submitLabel}
        </Button>
      </div>
    </div>
  );
}
