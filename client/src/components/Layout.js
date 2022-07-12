import React, { useState } from 'react';
import { Link } from "react-router-dom";
// import { Navbar, Nav, Container} from "react-bootstrap";
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Modal from '@mui/material/Modal'
import { makeStyles, Tab } from '@material-ui/core';

const useStyles = makeStyles({
  appBar: {
    background: 'linear-gradient(45deg, #010e5c 30%, #ff5722 90%)',
    color: '#90caf9',
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
  },
});

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function Layout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className={classes.appBar}>
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1 }}
            component="div"
            color="#90caf9"
          >
            Google Jobs Search
          </Typography>
          <IconButton
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        <div>
          <div>{children}</div>
        </div>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[{name:'Search For Jobs', link: '/'}, {name:'Login', link: '/login'}, {name:'Signup', link: '/signup'}].map((text, index) => (
            <Link to= {text.link}>
            <ListItem
              key={text.name}
              disablePadding
              onClick={() => setShowModal(true)}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {['Saved Jobs', 'Contact Us'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Modal
          size="lg"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="signup-modal"
        >
          <Tab.Container defaultActiveKey="login">
            <Modal.Header closeButton>
              <Modal.Title id="signup-modal">
                <List variant="pills">
                  <ListItem>
                    <Link to= '/login'>Login</Link>
                  </ListItem>
                  <ListItem>
                    <Link eventKey="signup">Sign Up</Link>
                  </ListItem>
                </List>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey="login">
                  <LoginForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey="signup">
                  <SignUpForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      </Drawer>
    </Box>
  );
}
// const drawerWidth = 240;

// const useStyles = makeStyles({
//   page: {
//     background: '#f9f9f9',
//     width: '100%',
//   },
//   drawer: {
//     width: drawerWidth,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   root: {
//     display: 'flex'
//   }
// });

// export default function Layout({ children }) {
//   const classes = useStyles();
//   return (
// <div className={classes.root}>
//   <Drawer
//     className={classes.drawer}
//     variant="permanent"
//     anchor="right"
//     classes={{ paper: classes.drawerPaper }}
//   >
//     <div>
//       <Typography variant="h5">Testing</Typography>
//     </div>
//   </Drawer>
//   <div>
//     <div className={classes.page}>{children}</div>
//   </div>
// </div>
//   );
// }
