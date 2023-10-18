import { JSX, useEffect } from 'react';

interface Props {
  route: JSX.Element;
  title: string;
}

export const RouteWithMeta = (props: Props) => {
  useEffect(() => {
    document.title = `${props.title} - TMS`;
  }, [props.title]);

  return props.route;
};
