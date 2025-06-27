import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token'); 

  const getProductsFromCart = async () => {
    try {
      const response = await axios.get(`https://mytshop.runasp.net/api/Carts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      console.log(response.data);
      setCartItems(response.data.cartResponse);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsFromCart();
  }, []);

    const incQnt = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
            `https://mytshop.runasp.net/api/Carts/increaseCount/${id}`,
            {},
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );

            if (response.status === 200) {
            const updatedItems = cartItems.map((item) =>
                item.id === id ? { ...item, count: item.count + 1 } : item
            );
            setCartItems(updatedItems);
            } else {
            console.warn('Failed to increase quantity:', response.status);
            }
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };


    const decQnt = async (id) => {
    try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        console.log('ID:', id);

        const response = await axios.patch(
        `https://mytshop.runasp.net/api/Carts/decreaseCount/${id}`,
        {},
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        console.log('Response:', response.data);

        if (response.status === 200) {
        const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, count: item.count - 1 } : item
        );
        setCartItems(updatedItems);
        } else {
        console.warn('Failed to decrease quantity:', response.status);
        }
    } catch (error) {
        console.error('Error decrease quantity:', error.response?.data || error.message);
    }
    };

    const deleteItem = async (id) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.delete(`https://mytshop.runasp.net/api/Carts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

        if (response.status === 200 || response.status === 204) {
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
            toast.success("✅ Product deleted successfully.");
            } else {
            toast.error(`❌ Failed to delete the product. Status code: ${response.status}`);
            }
            } catch (error) {
            console.error("Error during delete operation:", error);
            if (error.response) {
                toast.error(`⚠️ Deletion error: ${error.response.statusText}`);
            } else {
                toast.error("⚠️ Unable to connect to the server. Please check your internet connection and try again.");
            }
            }

    };


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom textAlign='center'>Shopping cart 🛒 </Typography>
      {loading ? (
        <CircularProgress />
      ) : cartItems.length === 0 ? (
        <Typography variant="h6" textAlign='center'> The basket is empty </Typography>
      ) : (<Box sx={{display:'flex'}} >
        <Grid container spacing={3} sx={{ display:'flex' , flexDirection:'column', width:'50%'}}>
            {cartItems.map((data, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ display:'flex', borderRadius: '20px' , p:0  , alignItems:'center', width: '80%', justifyContent:'center'}}>
                    <CardMedia
                    component="img"
                    image={/*data.mainImg ||*/ 'https://placehold.co/200x200'}
                    sx={{ borderRadius: '25px' , width:300 , height:200 , p:2 }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" gutterBottom>
                        {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        the price : {data.price}
                    </Typography>

                    <Box sx={{display:'flex' , alignItems:'center', gap:1 , borderRadius:'20px' , justifyContent:'center'}} >
                        <IconButton sx={{color:'#212121' , borderRadius:'50px' , backgroundColor:'#fafafa'}} onClick={()=>{incQnt(data.id)}}><AddIcon/></IconButton>
                        <IconButton sx={{color:'#212121' , borderRadius:'50px' }}>{data.count}</IconButton>
                        <IconButton sx={{color:'#212121' , borderRadius:'50px' , backgroundColor:'#fafafa'}} onClick={()=>{decQnt(data.id)}}><RemoveIcon/></IconButton>
                        <IconButton sx={{color:'#d50000' , borderRadius:'50px'}} onClick={()=>{deleteItem(data.id)}}><DeleteIcon/></IconButton>
                    </Box>

                    </CardContent>
                </Card>
                </Grid>
            ))}

        </Grid>
        <Typography variant="h3" color="text.secondary">
                summary
        </Typography>

        </Box>
      )}
    </Box>
  );
}
