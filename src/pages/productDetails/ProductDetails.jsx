import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress, CardMedia, Container } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProductDetails = async () => {
    try {
      const response = await axios.get(`https://mytshop.runasp.net/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const AddToCart = async (productId) => {
          const token = localStorage.getItem("token");
  
          if (!token) {
              toast.error("You must be logged in to add products to your cart.");
              return;
          }
  
          try {
              await axios.post(
                  `https://mytshop.runasp.net/api/Carts/${productId}`,
                  {
                      productId: productId,
                      quantity: 1
                  },
                  {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  }
              );
  
              toast.success("Product has been added to your cart successfully 🛒", {
                  position: "top-right",
                  autoClose: 3500,
                  theme: "colored"
              });
          } catch (error) {
              toast.error("Failed to add product to cart. Please try again 😓", {
                  position: "top-right",
                  autoClose: 3500,
                  theme: "colored"
              });
              console.error("AddToCart Error:", error.response?.data || error.message);
          }
      };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">Product not found.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 ,justifyContent:'center' ,alignItems:'center'}}>
        <CardMedia
          component="img"
          image='https://placehold.co/200x200'
          alt={product.name}
          sx={{ width: { xs: '100%', md: 300 }, height: 300, objectFit: 'contain', borderRadius: 2 }}
        />
        <Box>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>{product.description}</Typography>
          <Typography variant="h5" color="primary" sx={{ mb: 3 }}>${product.price}</Typography>
          <Button variant="contained" color="primary" onClick={()=>AddToCart(product.id)}>Add to Cart</Button>
        </Box>
      </Box>
    </Container>
  );
}
