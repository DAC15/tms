import { Close, Delete, Done, Edit, MoreVert } from '@mui/icons-material';
import { Chip, IconButton, Menu, MenuItem } from '@mui/material';
import { Task } from '@tms/shared-models';
import { ReactNode, useState } from 'react';

interface Props {
  className?: string;
  task: Task;
  onUpdate: () => void;
  onDelete: () => void;
  onComplete: (value: boolean) => void;
}

export function TaskCard(props: Props): ReactNode {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <div className={`${props.className} flex gap-4 w-full`}>
      <div className="w-full">
        <h4>{props.task.title}</h4>
      </div>
      <div className="flex items-center">
        {props.task.completed ? (
          <Chip
            label="Mark as undone"
            onDelete={() => props.onComplete(false)}
            deleteIcon={<Close />}
            variant="outlined"
          />
        ) : (
          <Chip
            color="success"
            label="Mark as done"
            onDelete={() => props.onComplete(true)}
            deleteIcon={<Done />}
          />
        )}
      </div>

      <IconButton
        size="large"
        onClick={(event) => setAnchorEl(event.currentTarget)}>
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem onClick={() => props.onUpdate()}>
          <Edit />
          Update task
        </MenuItem>
        <MenuItem onClick={() => props.onDelete()}>
          <Delete />
          Delete task
        </MenuItem>
      </Menu>
    </div>
  );
}
