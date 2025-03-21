import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import useMediaQuery from '@mui/material/useMediaQuery'; // Hook for responsive behavior

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

export default function Sidebar({ open, handleDrawerClose, theme }) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Detect small screens

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Drawer for larger screens */}
      <Drawer
        variant={isSmallScreen ? 'temporary' : 'permanent'} // Use temporary variant for small screens
        open={open}
        onClose={handleDrawerClose} // Close drawer on small screens when clicking outside
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: 'Products', icon: <StorefrontIcon /> },
            { text: 'Orders', icon: <ShoppingCartIcon /> },
            { text: 'Categories', icon: <CategoryIcon /> },
            { text: 'Customers', icon: <PeopleIcon /> },
            { text: 'Contact us', icon: <ContactPhoneIcon /> },
          ].map(({ text, icon }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={isSmallScreen ? handleDrawerClose : undefined} // Close drawer on small screens when an item is clicked
              >
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