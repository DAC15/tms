import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Task } from '../entities';

export class TaskUpdateDto implements Omit<Task, 'id'> {
  @IsBoolean()
  @IsNotEmpty()
  completed!: boolean;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}
