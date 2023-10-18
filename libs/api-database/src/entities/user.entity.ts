import { User } from '@tms/shared-models';
import * as bcrypt from 'bcrypt';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public fullName!: string;

  @Column({ type: 'varchar' })
  public email!: string;

  @Column({ type: 'varchar', select: false, nullable: true })
  public password!: string;

  public validatePassword(password: string): boolean {
    if (!this.password) return false;
    return bcrypt.compareSync(password, this.password);
  }
}
