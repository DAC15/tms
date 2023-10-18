import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@tms/api-auth';
import { TaskEntity } from '@tms/api-database';
import {
  PaginatedResponseDto,
  Task,
  TaskCreateDto,
  TaskPatchDto,
  TaskUpdateDto,
} from '@tms/shared-models';
import { ILike } from 'typeorm';

@ApiTags('Tasks')
@Controller('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TasksApiController {
  @Get()
  public getMany(
    @Query()
    query: Record<
      'pageSize' | 'pageIndex' | 'filterByTerm' | 'filterByCompleted',
      string
    >
  ): Promise<PaginatedResponseDto<Task>> {
    const pageSize = isNaN(Number(query.pageSize))
      ? 10
      : Number(query.pageSize);
    const pageIndex = isNaN(Number(query.pageIndex))
      ? 1
      : Number(query.pageIndex);

    const filterByTerm = query.filterByTerm
      ? ILike(`%${query.filterByTerm.toLowerCase()}%`)
      : undefined;

    const filterByCompleted = query.filterByCompleted
      ? query.filterByCompleted === 'true'
      : undefined;

    return TaskEntity.findAndCount({
      order: { id: 'desc' },
      take: pageSize,
      skip: pageSize * (pageIndex - 1),
      where:
        filterByTerm || filterByCompleted != null
          ? [
              { title: filterByTerm, completed: filterByCompleted },
              { description: filterByTerm, completed: filterByCompleted },
            ]
          : undefined,
    });
  }

  @Post()
  public async post(@Body() dto: TaskCreateDto): Promise<Task> {
    return TaskEntity.save(TaskEntity.create({ ...dto }));
  }

  @Put(':id')
  public async put(
    @Param('id') id: string,
    @Body() dto: TaskUpdateDto
  ): Promise<Task> {
    const task = await TaskEntity.findOne({ where: { id: Number(id) } });
    if (!task) {
      throw new BadRequestException('Task not found');
    }
    await TaskEntity.update(task.id, dto);

    return task;
  }

  @Patch(':id')
  public async patch(
    @Param('id') id: string,
    @Body() dto: TaskPatchDto
  ): Promise<Task> {
    if (!Object.values(dto)) {
      throw new NotAcceptableException('Nothing to update');
    }
    const task = await TaskEntity.findOne({ where: { id: Number(id) } });
    if (!task) {
      throw new BadRequestException('Task not found');
    }
    await TaskEntity.update(task.id, dto);

    return task;
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<boolean> {
    const task = await TaskEntity.findOne({ where: { id: Number(id) } });
    if (!task) {
      throw new BadRequestException('Task not found');
    }
    await TaskEntity.delete(task.id);

    return true;
  }
}
