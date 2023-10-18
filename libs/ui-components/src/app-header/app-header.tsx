import AdbIcon from '@mui/icons-material/Adb';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

interface Props {
  userName: string;
  logoutClick: () => void;
}

export function AppHeader(props: Props) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar className="gap-4" disableGutters>
          <AdbIcon className="flex mr-1" />
          <Avatar className="ml-auto bg-white text-blue-900 font-bold">
            {props.userName
              .split(' ')
              .map((el) => el.at(0))
              .join('')}
          </Avatar>
          <IconButton
            className="text-white"
            aria-label="logout"
            size="large"
            onClick={props.logoutClick}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
