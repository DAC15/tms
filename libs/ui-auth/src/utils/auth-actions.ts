import { SharedConfig } from '@tms/shared-config';
import { setAuthToken } from './auth-token';

export function loginInApp(accessToken: string): void {
  setAuthToken(accessToken);
  window.location.href = `${SharedConfig.url.ui}/`;
}

export function logoutFromApp(): void {
  setAuthToken(undefined);
  window.location.href = `${SharedConfig.url.ui}/auth/login`;
}
