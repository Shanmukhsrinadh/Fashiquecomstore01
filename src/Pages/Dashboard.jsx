import * as React from 'react';
import Box from '@mui/material/Box';
import HeaderAndSidebar from '../Componentsind/Navigation';
import MainContent from '../Componentsind/Content';

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);
  const [cart, setCart] = React.useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [activeSection, setActiveSection] = React.useState('Products');

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleSectionChange = (section) => setActiveSection(section);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <HeaderAndSidebar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        handleSectionChange={handleSectionChange}
      />
      <MainContent
        activeSection={activeSection}
        cart={cart}
        setCart={setCart}
        handleSectionChange={handleSectionChange}
      />
    </Box>
  );
}