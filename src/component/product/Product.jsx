import { Box, Card, Grid, CircularProgress, Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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

const getProducts = async () => {
try {
    const response = await axios.get('https://mytshop.runasp.net/api/products');
    setProducts(response.data);
} catch (error) {
    console.log(error.message);
} finally {
    setIsLoading(false);
}
};

    useEffect(() => {
        getProducts();
    }, []);

    if (isLoading) {
        return (
            <Box sx={{ height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth='90%' sx={{ p:10}}>
        <Typography textAlign='center' gutterBottom sx={{ letterSpacing: '2px', fontWeight: 600, fontFamily: '"Roboto", sans-serif' , color:'#212121' , fontSize:{
                            xs: 20,
                            sm: 30, 
                            md: 30, 
                            lg: 40, 
                            xl: 50 } }}>Best sellers</Typography>
        <Typography textAlign='center' gutterBottom sx={{color: '#757575' ,letterSpacing: '1px' }}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.</Typography>                    
        <Box
        sx={{
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >

            <Grid container spacing={2} justifyContent="center">
                {products.map((product, index) => (
                    <Grid item key={index}  justifyContent="center"  sx={{gap: { xs: 2, sm: 4 },}}>
                        <Card sx={{  p: 0, my: 4 , boxShadow:'none' }} onClick={() => navigate(`/productDetails/${product.id}`)}>
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia
                                sx={{ borderRadius: '10px', width: '220px', height: '220px' , marginBottom:2 }}
                                image='https://placehold.co/250x250'
                                title={product.name}
                                />
                                <IconButton 
                                aria-label="add to favorites"
                                onClick={(e) => e.stopPropagation()}
                                sx={{
                                    position: 'absolute',
                                    top: 15,
                                    right: 15,
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                    borderRadius:'8px',
                                    width:'35px',
                                    height:'35px',
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
                                }}
                                >
                                <FavoriteBorderIcon />
                                </IconButton>
                            </Box>
                            <CardContent sx={{p:0}}>
                                <Typography gutterBottom variant="h6" component="div" align="left" sx={{p:0 , fontWeight:600}}>
                                    {product.name}
                                </Typography>
                                <Typography variant="h6" gutterBottom component="div" align="left" color='#9e9e9e' >
                                    $ {product.price}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
{/*                                 
                                <IconButton aria-label="add to cart" onClick={(e) => { e.stopPropagation(); AddToCart(product.id); }}>
                                    <AddShoppingCartIcon />
                                </IconButton> */}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
        </Container>
    );
    
}
