import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  CssBaseline,
  Paper,
  Skeleton,
  CircularProgress
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function SecondaryLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const isHome = location.pathname === '/';


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); 

    return () => clearTimeout(timer);
  }, []);


  const handleNavigate = (path) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(path);
      setIsTransitioning(false);
    }, 500);
  };

  if (isLoading || isTransitioning) {
    return (
      <Container maxWidth="sm" sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <CssBaseline />
        {isHome ? (
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Paper elevation={3} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
                <Skeleton variant="text" width="60%" height={60} sx={{ mb: 3, mx: 'auto' }} />
                <Skeleton variant="text" width="80%" height={30} sx={{ mb: 4, mx: 'auto' }} />
                <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2 }} />
              </Paper>
            </Box>
          </Container>
        ) : (
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
            <Typography variant="body1">Loading content...</Typography>
          </Box>
        )}
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh' 
    }}>
      <CssBaseline />
      {isHome && (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paper elevation={3} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
              <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                Welcome to My App
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Please login to access your account
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleNavigate('/login')}
                sx={{ mt: 2 }}
              >
                Go to Login
              </Button>
            </Paper>
          </Box>
        </Container>
      )}
      <Outlet />
    </Container>
  );
}