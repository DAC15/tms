import { MyUserDto } from '@tms/shared-models';

export interface AuthState {
  loaded: boolean;
  user: MyUserDto | null;
}

export function getInitialState(): AuthState {
  return {
    loaded: false,
    user: null,
  };
}
