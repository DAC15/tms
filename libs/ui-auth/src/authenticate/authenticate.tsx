import { SplashScreen } from '@tms/ui-components';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthProvider } from '../providers';
import { AuthSlice, AuthState } from '../store';
import { getAuthToken, logoutFromApp } from '../utils';

interface Props {
  children: ReactNode;
}

export function Authenticate(props: Props): Props['children'] | null {
  const auth = useSelector((s: { auth: AuthState }) => s.auth);
  if (!auth) {
    throw new Error('Auth not found');
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.loaded) {
      const accessToken = getAuthToken();
      if (!accessToken) {
        dispatch(AuthSlice.actions.setLoaded());
        return;
      }

      AuthProvider.getMe()
        .then((user) => dispatch(AuthSlice.actions.setUser({ user })))
        .finally(() => dispatch(AuthSlice.actions.setLoaded()));
    }
  }, [auth.loaded]);

  if (!auth.loaded) {
    return <SplashScreen className="fixed top-0 left-0 z-99999" />;
  }
  if (!auth.user) {
    logoutFromApp();
    return null;
  }

  return props.children;
}
