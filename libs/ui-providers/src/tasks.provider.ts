import { SharedConfig } from '@tms/shared-config';
import {
  PaginatedResponseDto,
  Task,
  TaskCreateDto,
  TaskPatchDto,
  TaskUpdateDto,
} from '@tms/shared-models';
import { authenticatedRequest } from '@tms/ui-auth';
import { buildQueryFromObject } from '@tms/ui-utils';

export const TasksProvider = {
  getMany: (
    queryParams?: Record<string, string>
  ): Promise<PaginatedResponseDto<Task>> => {
    return authenticatedRequest<PaginatedResponseDto<Task>>({
      method: 'GET',
      url: `${SharedConfig.url.api}/tasks?${buildQueryFromObject(queryParams)}`,
    }).then((res) => res.data);
  },

  create: (dto: TaskCreateDto): Promise<Task> => {
    return authenticatedRequest<Task>({
      method: 'POST',
      url: `${SharedConfig.url.api}/tasks`,
      data: dto,
    }).then((res) => res.data);
  },

  update: (id: number, dto: TaskUpdateDto): Promise<Task> => {
    return authenticatedRequest<Task>({
      method: 'PUT',
      url: `${SharedConfig.url.api}/tasks/${id}`,
      data: dto,
    }).then((res) => res.data);
  },

  patch: (id: number, dto: TaskPatchDto): Promise<Task> => {
    return authenticatedRequest<Task>({
      method: 'PATCH',
      url: `${SharedConfig.url.api}/tasks/${id}`,
      data: dto,
    }).then((res) => res.data);
  },

  delete: (id: number): Promise<boolean> => {
    return authenticatedRequest<boolean>({
      method: 'DELETE',
      url: `${SharedConfig.url.api}/tasks/${id}`,
    }).then((res) => res.data);
  },
};
