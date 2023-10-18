import { SharedConfig } from '@tms/shared-config';
import {
  AuthLoginDto,
  AuthRegisterDto,
  AuthTokenResponseDto,
  MyUserDto,
} from '@tms/shared-models';
import axios from 'axios';
import { authenticatedRequest } from '../utils';

export const AuthProvider = {
  register: (dto: AuthRegisterDto): Promise<AuthTokenResponseDto> => {
    return axios
      .post(`${SharedConfig.url.api}/auth/register`, dto)
      .then((res) => res.data);
  },
  login: (dto: AuthLoginDto): Promise<AuthTokenResponseDto> => {
    return axios
      .post(`${SharedConfig.url.api}/auth/login`, dto)
      .then((res) => res.data);
  },
  getMe: (): Promise<MyUserDto> => {
    return authenticatedRequest<MyUserDto>({
      method: 'GET',
      url: `${SharedConfig.url.api}/auth/me`,
    }).then((res) => res.data);
  },
};
