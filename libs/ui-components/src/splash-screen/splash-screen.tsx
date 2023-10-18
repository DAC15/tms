import { CircularProgress } from '@mui/material';
import './splash-screen.css';

interface Props {
  className?: string;
}

export function SplashScreen(props: Props): JSX.Element {
  return (
    <div
      style={{
        animation:
          'keyframe-transparent-to-opaque 1s cubic-bezier(0.4, 0, 0.6, 1)',
      }}
      className={`${props.className} h-full w-full flex flex-col items-center justify-center bg-base-100`}>
      <CircularProgress />
    </div>
  );
}
