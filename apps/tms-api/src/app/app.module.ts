import { Module } from '@nestjs/common';
import { AuthModule } from '@tms/api-auth';
import { AuthApiModule } from './auth';
import { TasksApiModule } from './tasks';

@Module({
  imports: [AuthModule, AuthApiModule, TasksApiModule],
})
export class AppModule {}
