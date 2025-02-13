import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Allproducts } from '../Data/Allproducts';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function ControlledCarousel() {
  const [index, setIndex] = React.useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const carouselStyle = {
    height: '360px',
    objectFit: 'cover',
    marginTop: '30px',
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} controls={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mobirise.com/extensions/commercem4/assets/images/3.jpg"
          alt="First slide"
          style={carouselStyle}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mobirise.com/extensions/commercem4/assets/images/gallery04.jpg"
          alt="Second slide"
          style={carouselStyle}
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://luxurywatchesusa.com/wp-content/uploads/2021/02/buy-watches-luxury-watches-usa.jpg"
          alt="Third slide"
          style={carouselStyle}
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default function MainContent({ activeSection, cart, setCart, handleSectionChange }) {
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const navigate = useNavigate();

  const allproducts = Allproducts;

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleViewProduct = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleConfirmPurchase = () => {
    setOrderPlaced(true);
    setCart([]);
  };

  const handleCloseSnackbar = () => {
    setOrderPlaced(false);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      {activeSection === 'Products' && (
        <>
          <ControlledCarousel />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mt: 3, color: 'black' }}>
            All Products
          </Typography>
          {allproducts.length === 0 ? (
            <Typography sx={{ textAlign: 'center', color: '#777', fontSize: '1.1rem' }}>
              No products available.
            </Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: 3,
                mt: 2,
                color: '#777',
              }}
            >
              {allproducts.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' },
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <img
                    src={product.url}
                    alt={product.title}
                    style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
                  />
                  <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                    {product.brand}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#777', mb: 2 }}>
                    <p>Price: <strong style={{ color: 'black' }}>₹{product.price}</strong></p>
                  </Typography>
                  <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      className={`btn btn-sm me-2 ${cart.some((item) => item.id === product.id) ? 'btn-success' : 'btn-dark'}`}
                      style={{ width: '48%', height: '35px' }}
                      onClick={() => handleAddToCart(product)}
                      disabled={cart.some((item) => item.id === product.id)}
                    >
                      {cart.some((item) => item.id === product.id) ? 'In Cart' : 'Add to Cart'}
                    </button>
                    <button
                      className="btn btn-outline-dark btn-sm"
                      style={{ width: '48%', height: '35px' }}
                      onClick={() => handleViewProduct(product)}
                    >
                      View
                    </button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </>
      )}

      {activeSection === 'Orders' && (
        <>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mt: 3, color: 'black' }}>
            Cart
          </Typography>
          {cart.length === 0 ? (
            <Typography sx={{ textAlign: 'center', color: '#777', fontSize: '1.1rem' }}>
              Your cart is empty.
            </Typography>
          ) : (
            <>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: 3,
                  mt: 2,
                  color: '#777',
                }}
              >
                {cart.map((product) => (
                  <Box
                    key={product.id}
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.02)' },
                      padding: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <img
                      src={product.url}
                      alt={product.title}
                      style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
                    />
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#777', mb: 2 }}>
                      Price: ₹{product.price}
                    </Typography>
                    <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        Remove from Cart
                      </button>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => handleSectionChange('Products')}
                >
                  Continue Shopping
                </button>
                <button
                  className="btn btn-dark btn-sm"
                  onClick={handleConfirmPurchase}
                >
                  Confirm Purchase
                </button>
              </Box>
            </>
          )}
        </>
      )}

      {/* Order Confirmation Popup */}
      <Snackbar
        open={orderPlaced}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Order placed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}