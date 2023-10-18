import { SharedConfig } from '@tms/shared-config';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
} from 'axios';
import { logoutFromApp } from './auth-actions';
import { getAuthToken } from './auth-token';

const getAxios = (): AxiosInstance => {
  const accessToken = getAuthToken();
  const Authorization = accessToken ? `Bearer ${accessToken}` : undefined;
  return axios.create({ headers: { Authorization } });
};

export function authenticatedRequest<Response = unknown, Data = unknown>(
  config: AxiosRequestConfig<Data>
): Promise<AxiosResponse<Response, Data>> {
  return getAxios()
    .request(config)
    .catch((error: AxiosError) => {
      if (error.response?.status === HttpStatusCode.Unauthorized) {
        logoutFromApp();
        window.location.href = `${SharedConfig.url.ui}/auth/login`;
      }

      throw error;
    });
}
