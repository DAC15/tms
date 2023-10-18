import { Module } from '@nestjs/common';
import { TasksApiController } from './tasks-api.controller';

@Module({
  controllers: [TasksApiController],
})
export class TasksApiModule {}
