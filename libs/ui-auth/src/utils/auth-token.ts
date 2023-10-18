import { StorageHelper } from '@tms/ui-utils';

export const getAuthToken = (): string | undefined => {
  return StorageHelper.getItem('tms-access-token');
};

export const setAuthToken = (value: string | undefined): void => {
  value
    ? StorageHelper.setItem('tms-access-token', value)
    : StorageHelper.removeItem('tms-access-token');
};
