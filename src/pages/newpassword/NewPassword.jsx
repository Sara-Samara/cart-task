import React, { useState, useEffect } from 'react';
import { 
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Skeleton
} from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';

export default function NewPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match!', {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (data.password.length < 6) {
      toast.warn('Password should be at least 6 characters', {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.patch('https://mytshop.runasp.net/api/Account/SendCode', {
        email: email || data.email, 
        code: data.code,
        password: data.password,
        ConfirmPassword: data.confirmPassword
      });

      if (response.status === 200) {
        toast.success('Password reset successfully! Redirecting to login...', {
          position: "top-center",
          autoClose: 2000,
          onClose: () => navigate('/login')
        });
      }
    } catch (error) {
      let errorMessage = 'Password reset failed';
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
        if (error.response.status === 400) {
          errorMessage = 'Invalid or expired verification code';
        }
      } else if (error.request) {
        errorMessage = 'Network error - please check your connection';
      }
      
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isPageLoading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', p: 3 }}>
        <Skeleton variant="text" width="60%" height={40} sx={{ mb: 3, alignSelf: 'center' }} />
        {[...Array(2)].map((_, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1.5 }} />
            <Skeleton variant="rectangular" width="100%" height={56} />
          </Box>
        ))}
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2 }} />
      </Container>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h5" gutterBottom align="center">
          Set a new password
        </Typography>

        <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-end', px: 1 }}>
              <LockPersonOutlinedIcon sx={{ color: 'action.active', mr: 1.5, mb: 2 }} />
              <FormControl variant="standard" fullWidth sx={{ mb: 2 }} >
                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                      id="standard-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                      <InputAdornment position="end">
                          <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}>
                              {showPassword ? (<VisibilityOff sx={{ fontSize: 18 }} />) : (<Visibility sx={{ fontSize: 20 }} />)}
                          </IconButton>
                      </InputAdornment>
                      }
                      {...register('password', { required: true })}
                  />
              </FormControl>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', px: 1 }}>
              <LockPersonOutlinedIcon sx={{ color: 'action.active', mr: 1.5, mb: 2 }} />
              <FormControl variant="standard" fullWidth sx={{ mb: 2 }} >
                  <InputLabel htmlFor="standard-adornment-confirm-password">Confirm Password</InputLabel>
                  <Input
                      id="standard-adornment-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      endAdornment={
                      <InputAdornment position="end">
                          <IconButton
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}>
                              {showConfirmPassword ? (<VisibilityOff sx={{ fontSize: 18 }} />) : (<Visibility sx={{ fontSize: 20 }} />)}
                          </IconButton>
                      </InputAdornment>
                      }
                      {...register('confirmPassword', { required: true })}
                  />
              </FormControl>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
          </Button>
        </Box>
      </Container>
    </>
  );
}