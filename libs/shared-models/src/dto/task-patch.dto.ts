import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Task } from '../entities';

export class TaskPatchDto implements Partial<Omit<Task, 'id'>> {
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
