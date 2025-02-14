import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'; // Import necessary router components

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#00796b',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open
      ? {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        }
      : {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        }),
  })
);

export default function HeaderAndSidebar({ open, handleDrawerOpen, handleDrawerClose, handleSectionChange }) {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleNavigate = (section) => {
    if (section === 'Products') {
      navigate('/dashboard'); // Redirect to /dashboard when "Orders" is clicked
    }
    handleSectionChange(section); // Change the section in the sidebar
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#212121' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ fontWeight: 'bold' }}>
            Fashique
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open} sx={{ width: open ? 240 : 80, transition: 'width 0.3s' }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[{ text: 'Products', icon: <StorefrontIcon /> },
            { text: 'Orders', icon: <ShoppingCartIcon /> },
            { text: 'Categories', icon: <CategoryIcon />, expandable: true },
            { text: 'Customers', icon: <PeopleIcon /> },
            { text: 'Contact us', icon: <ContactPhoneIcon /> }].map(({ text, icon }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleNavigate(text)}>
                <ListItemIcon sx={{ color: '#555' }}>{icon}</ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, fontWeight: 'bold' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

