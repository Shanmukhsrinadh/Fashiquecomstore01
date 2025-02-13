import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Allproducts } from '../Data/Allproducts';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import HeaderAndSidebar from '../Componentsind/Navigation';
function ProductDetail() {
  const { id } = useParams();
  const product = Allproducts.find((p) => p.id === parseInt(id));
  const [cart, setCart] = React.useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      return updatedCart;
    });
    setSnackbarOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      return updatedCart;
    });
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const similarProducts = Allproducts.filter(
    (p) => p.mainCategory === product.mainCategory && p.id !== product.id
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <HeaderAndSidebar />
      <Box sx={{ flexGrow: 1, marginTop: '80px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '40px', padding: '20px' }}>
          <Box sx={{ flex: 1, maxWidth: '500px' }}>
            <img
              src={product.url}
              alt={product.title}
              style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
            />
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#212121' }}>
    {product.title}
  </Typography>

  <div className="product-details" style={{ display: 'flex', gap: '80px' }}>
    <div className="details-label" style={{ color: 'black', fontWeight: 'bold' }}>
      <p>Brand:</p>
      <p>Price:</p>
      <p>Discount:</p>
      <p>Warranty:</p>
      <p>Actual Price:</p>
      <p>Discounted Price:</p>
      <p>Size:</p>
      <p>In Stock:</p>
      <p>Material:</p>
      <p>Colors:</p>
      <p>Rating:</p>
      <p>Review Count:</p>
    </div>
    <div className="details-value">
      <p>{product.brand}</p>
      <p>₹{product.price}</p>
      <p>{product.discount}%</p>
      <p>{product.warranty}</p>
      <p>₹{product.actualPrice}</p>
      <p>₹{product.discountedPrice}</p>
      <p>{product.size?.join(', ')}</p>
      <p>{product.inStock}</p>
      <p>{product.material}</p>
      <p>{product.colors?.join(', ')}</p>
      <p>{product.rating}</p>
      <p>{product.reviewCount}</p>
    </div>
  </div>

  {cart.some((item) => item.id === product.id) ? (
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#ff4444',
        color: '#fff',
        '&:hover': { backgroundColor: '#cc0000' },
        width: '200px',
        mt: 2,
      }}
      onClick={() => handleRemoveFromCart(product.id)}
    >
      Remove from Cart
    </Button>
  ) : (
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#00796b',
        color: '#fff',
        '&:hover': { backgroundColor: '#004d40' },
        width: '200px',
      }}
      onClick={() => handleAddToCart(product)}
    >
      Add to Cart
    </Button>
  )}

  <Button
    variant="outlined"
    sx={{
      borderColor: '#00796b',
      color: '#00796b',
      '&:hover': { borderColor: '#004d40', color: '#777' },
      width: '200px',
    }}
    onClick={() => navigate('/dashboard')}
  >
    Back to Products
  </Button>
</Box>

        </Box>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#212121' }}>
          Similar Products
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 3,
            mt: 2,
          }}
        >
          {similarProducts.map((similarProduct) => (
            <Box
              key={similarProduct.id}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
                padding: 2,
              }}
              onClick={() => navigate(`/product/${similarProduct.id}`)}
            >
              <img
                src={similarProduct.url}
                alt={similarProduct.title}
                style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
              />
              <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                {similarProduct.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#555' }}>
                <strong>Price:</strong> <span style={{ color: 'black', fontWeight: 'bold' }}>₹{similarProduct.price}</span>

              </Typography>
            </Box>
          ))}
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {cart.some((item) => item.id === product.id)
              ? 'Added to the cart successfully!'
              : 'Removed from cart successfully!'}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default ProductDetail;