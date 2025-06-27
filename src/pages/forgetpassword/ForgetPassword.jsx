import React, { useState, useEffect } from 'react';
import { 
  Container,
  Box,
  TextField,
  Button,
  Skeleton,
  CircularProgress
} from '@mui/material';
import { AlternateEmail } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgetPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                'https://mytshop.runasp.net/api/Account/ForgotPassword', 
                {}
            );
            
            if (response.status === 200) {
                toast.success('Password reset link sent to your email! Redirecting...', {
                    position: "top-center",
                    autoClose: 2000,
                    onClose: () => navigate('/validate'),
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            let errorMessage = 'Failed to send reset email';
            
            if (error.response) {
                if (error.response.status === 404) {
                    errorMessage = 'Email not found in our system';
                } else {
                    errorMessage = error.response.data?.message || errorMessage;
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

    if (isLoading) {
        return (
            <Container maxWidth="sm" sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                minHeight: '100vh', 
                p: 3 
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1.5 }} />
                    <Skeleton variant="rectangular" width="100%" height={56} />
                </Box>
                <Skeleton variant="rectangular" width="100%" height={48} />
            </Container>
        );
    }

    return (
        <>
            
            <Container maxWidth="sm" sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                minHeight: '100vh' 
            }}>
                <Box 
                    component="form" 
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ width: '100%', p: 3 }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 4 }}>
                        <AlternateEmail sx={{ color: 'action.active', mr: 1.5, mb: 0.5 }} />
                        <TextField
                            label="Email"
                            variant="standard"
                            fullWidth
                            required
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

                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth
                        sx={{ height: 48 }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Send Reset Link'
                        )}
                    </Button>
                </Box>
            </Container>
        </>
    );
}