import { Box, Card, Grid, Stack, CircularProgress, Container, CardMedia } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';

export default function Catgories() {
    const [catgories , setCatgories] = useState([]);
    const [isLoading , setIsLoading] = useState(true);

    const getCategories = async ()=>{
        try{
             const response = await axios.get('https://mytshop.runasp.net/api/categories');
             console.log(response.data);
             setCatgories(response.data);
        }
        catch(error){
             console.log(error.massege);
        }
        finally {
            setIsLoading(false);
        }
    }  


    useEffect(()=>{
           getCategories();
    },[])

    if (isLoading) {
            return (
                <Box sx={{ height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            );
    }
    

return (
  <Container maxWidth="100%" sx={{mb:20 , display:'flex', justifyContent:'center'}}>
    <Box sx={{ 
      background: 'linear-gradient(135deg, #fbf7f3 0%, #f6f6f5 100%)', 
      borderRadius: '20px',
      py: 4,
      width: '90%',
    }}>
      <Typography textAlign='center' gutterBottom sx={{ letterSpacing: '2px', fontWeight: 600, fontFamily: '"Roboto", sans-serif' , color:'#212121' , fontSize:{
                                xs: 20,
                                sm: 30, 
                                md: 30, 
                                lg: 40, 
                                xl: 50 } }}>Catgories</Typography>
      <Grid 
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        justifyContent="center"
        sx={{
          px: { xs: 2, sm: 4 },
        }}
      >
        {catgories.map((catgore) => (
          <Grid 
            item 
            xs={6} 
            sm={4} 
            md={3} 
            lg={2} 
            key={catgore.id}
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center', 
              minHeight: '200px',
              gap: 2,
              p: 2,
              borderRadius: '8px' 
            }}
          >

            <Card sx={{
              width: { xs: 100, sm: 120, md: 140 },
              height: { xs: 100, sm: 120, md: 140 },
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 3,
              p:2,
              mx: 'auto' 
            }}>
              <CardMedia
                component="img"
                sx={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                image={catgore.image || 'https://placehold.co/300x300'}
                alt={catgore.name}
              />
            </Card>

            <Typography 
              sx={{ 
                width: '100%',
                textAlign: 'center',
                fontSize: { xs: 14, sm: 16 },
                fontWeight: 600,
                color: '#212121',
                backgroundColor: 'transparent', 
                px: 1,
                wordBreak: 'break-word'
              }}
            >
              {catgore.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Container>
)
}
