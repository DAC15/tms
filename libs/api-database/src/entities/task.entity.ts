import { Task } from '@tms/shared-models';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'task' })
export class TaskEntity extends BaseEntity implements Task {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public title!: string;

  @Column({ type: 'varchar' })
  public description!: string;

  @Column({ type: 'boolean' })
  public completed!: boolean;
}
