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
  Typography,
  Stack,
  CircularProgress,
  Skeleton
} from '@mui/material';
import { 
  AccountCircle, 
  AlternateEmail, 
  LockPersonOutlined as LockPersonOutlinedIcon,
  Visibility, 
  VisibilityOff,
  CalendarMonth as CalendarMonthIcon
} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const { register, handleSubmit, control, formState: { errors }, watch } = useForm();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (values) => {
        if (values.password !== values.confirmPassword) {
            toast.error('Passwords do not match', {
                position: "top-center",
                autoClose: 4000,
            });
            return;
        }

        try {
            const response = await axios.post('https://mytshop.runasp.net/api/Account/register', values);
            
            if (response.status >= 200 && response.status < 300) {
                toast.success('Registration successful! Redirecting to login...', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    onClose: () => navigate('/login', { replace: true }),
                });
            }
        } catch (error) {
            let errorMessage = 'Registration failed';
            
            if (error.response) {
                errorMessage = error.response.data?.message || errorMessage;
                
                if (error.response.status === 400) {
                    if (errorMessage.toLowerCase().includes('email')) {
                        errorMessage = 'Email is already registered';
                    } else if (errorMessage.toLowerCase().includes('username')) {
                        errorMessage = 'Username is already taken';
                    }
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

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => event.preventDefault();

    if (isLoading) {
        return (
            <Container maxWidth="sm" sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                minHeight: '100vh', 
                p: 3 
            }}>
                <Skeleton variant="text" width="40%" height={40} sx={{ mb: 3, alignSelf: 'center' }} />
                
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    {[...Array(2)].map((_, i) => (
                        <Box key={i} sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
                            <Skeleton variant="rectangular" width="100%" height={56} />
                        </Box>
                    ))}
                </Stack>
                
                {[...Array(4)].map((_, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1.5 }} />
                        <Skeleton variant="rectangular" width="100%" height={56} />
                    </Box>
                ))}
                
                <Skeleton variant="rectangular" width="100%" height={48} sx={{ mt: 2 }} />
            </Container>
        );
    }

    return (
        <>
            
            <Container maxWidth="sm" sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh' 
            }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    Register
                </Typography>

                <Box 
                    component="form" 
                    sx={{ width: '100%', '& > :not(style)': { m: 2 } }} 
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Stack direction="row" spacing={2}>
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, mb: 2 }} />
                            <TextField 
                                label="First Name" 
                                variant="standard" 
                                fullWidth 
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                {...register('firstName', { 
                                    required: 'First name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Must be at least 2 characters'
                                    }
                                })} 
                            />
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, mb: 2 }} />
                            <TextField 
                                label="Last Name" 
                                variant="standard" 
                                fullWidth 
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                                {...register('lastName', { 
                                    required: 'Last name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Must be at least 2 characters'
                                    }
                                })} 
                            />
                        </Box>
                    </Stack>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1.5, mb: 2 }} />
                        <TextField 
                            label="Username" 
                            variant="standard" 
                            fullWidth 
                            error={!!errors.userName}
                            helperText={errors.userName?.message}
                            {...register('userName', { 
                                required: 'Username is required',
                                minLength: {
                                    value: 4,
                                    message: 'Must be at least 4 characters'
                                }
                            })} 
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AlternateEmail sx={{ color: 'action.active', mr: 1.5, mb: 2 }} />
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

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <LockPersonOutlinedIcon sx={{ color: 'action.active', mr: 1.5, mb: 2 }} />
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
                                        message: 'Must be at least 6 characters'
                                    }
                                })}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <LockPersonOutlinedIcon sx={{ color: 'action.active', mr: 1.5, mb: 2 }} />
                        <FormControl variant="standard" fullWidth error={!!errors.confirmPassword}>
                            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                {...register('confirmPassword', { 
                                    required: 'Please confirm your password',
                                    validate: value => 
                                        value === watch('password') || 'Passwords do not match'
                                })}
                            />
                        </FormControl>
                    </Box>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <CalendarMonthIcon sx={{ color: 'action.active', mr: 1.5, mb: 2 }} />
                            <Controller
                                name="birthOfDate"
                                control={control}
                                rules={{ required: 'Date of birth is required' }}
                                render={({ field, fieldState: { error } }) => (
                                    <DatePicker
                                        label="Date of Birth"
                                        value={field.value}
                                        onChange={field.onChange}
                                        slots={{
                                            openPickerIcon: CalendarMonthIcon,
                                        }}
                                        slotProps={{
                                            textField: {
                                                variant: 'standard',
                                                fullWidth: true,
                                                error: !!error,
                                                helperText: error?.message,
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Box>
                    </LocalizationProvider>

                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth
                        disabled={isLoading}
                        sx={{ height: 48, mt: 2 }}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                    </Button>
                </Box>
            </Container>
        </>
    );
}