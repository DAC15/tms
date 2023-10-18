import { User } from '../entities';

export type MyUserDto = Pick<User, 'fullName'>;
