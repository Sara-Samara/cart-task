import React, { useState } from 'react';
import { 
  Container,
  Box,
  TextField,
  Button,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Link,
  Typography,
  Skeleton,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, LockPersonOutlined, AlternateEmail } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true); 
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

  
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const LoginSubmit = async (values) => {
        setIsLoading(true);
        try {
            const response = await axios.post('https://mytshop.runasp.net/api/Account/Login', values);
            
            if (response.status >= 200 && response.status < 300) {
                toast.success('Login successful! Redirecting...', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    onClose: () => navigate('/', { replace: true }),
                });
            }
        } catch (error) {
            let errorMessage = 'Login failed';
            
            if (error.response) {
                const message = error.response.data?.message || error.response.data || errorMessage;
                
                if (message.toLowerCase().includes("email not confirmed")) {
                    toast.warn('Please confirm your email before logging in', {
                        position: "top-center",
                        autoClose: 5000,
                    });
                } else if (message.toLowerCase().includes("invalid credentials")) {
                    toast.error('Incorrect email or password', {
                        position: "top-center",
                        autoClose: 4000,
                    });
                } else {
                    toast.error(message, {
                        position: "top-center",
                        autoClose: 4000,
                    });
                }
            } else if (error.request) {
                toast.error('Network error. Please check your connection', {
                    position: "top-center",
                    autoClose: 4000,
                });
            } else {
                toast.error('An unexpected error occurred', {
                    position: "top-center",
                    autoClose: 4000,
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => event.preventDefault();

    if (isPageLoading) {
        return (
            <Container maxWidth="sm" sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                minHeight: '100vh', 
                p: 3 
            }}>
                <Skeleton variant="text" width="40%" height={40} sx={{ mb: 3, alignSelf: 'center' }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1.5 }} />
                    <Skeleton variant="rectangular" width="100%" height={56} />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1.5 }} />
                    <Skeleton variant="rectangular" width="100%" height={56} />
                </Box>
                
                <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="30%" sx={{ alignSelf: 'center' }} />
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
            
            <Container maxWidth="sm" sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh' 
            }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    Login
                </Typography>

                <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit(LoginSubmit)}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 3 }}>
                        <AlternateEmail sx={{ color: 'action.active', mr: 1.5, mb: 0.5 }} />
                        <TextField 
                            label="Email" 
                            variant="standard" 
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })} 
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
                        <LockPersonOutlined sx={{ color: 'action.active', mr: 1.5, mb: 0.5 }} />
                        <FormControl variant="standard" fullWidth error={!!errors.password}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                {...register('password', { 
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                        <Link
                            component="button"
                            variant="body2"
                            sx={{ 
                                fontSize: '0.75rem',
                                color: 'text.secondary',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                            onClick={() => navigate('/forgot-password')}
                        >
                            Forgot Password?
                        </Link>
                    </Box>

                    <Button 
                        variant="contained" 
                        fullWidth 
                        type="submit"
                        sx={{ mb: 2, height: 44 }}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'LOG IN'}
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" component="span">
                            Don't have an account? 
                        </Typography>
                        <Link 
                            component="button" 
                            variant="body2"
                            sx={{ ml: 1 }}
                            onClick={() => navigate('/register')}
                        >
                            Sign up
                        </Link>
                    </Box>
                </Box>
            </Container>
        </>
    );
}