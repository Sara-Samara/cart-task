import React, { useState, useEffect } from 'react';
import { 
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  Link,
  CircularProgress,
  Skeleton,
  Box
} from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function VerificationPage() {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const sendVerificationCode = async () => {
    try {
      setIsResending(true);
      await axios.post('https://mytshop.runasp.net/api/Account/SendCode', {});
      toast.success('Verification code sent successfully', {
        position: "top-center",
        autoClose: 3000,
      });
      setTimer(60);
    } catch (error) {
      let errorMessage = 'Failed to send verification code';
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Network error - please check your connection';
      }
      
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setIsResending(false);
      setIsLoading(false);
    }
  };

  const handleCodeChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      if (value && index < 3) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = async () => {

    try {
      setIsLoading(true);
      const response = await axios.post('https://mytshop.runasp.net/api/Account/VerifyCode', {});
      
      if (response.status === 200) {
        toast.success('Verification successful!', {
          position: "top-center",
          autoClose: 2000,
          onClose: () => navigate('/new-password')
        });
      }
    } catch (error) {
      let errorMessage = 'Invalid verification code';
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Network error - please try again';
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
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', p: 3 }}>
        <Skeleton variant="text" width="60%" height={40} sx={{ mb: 3, alignSelf: 'center' }} />
        
        <Grid container justifyContent="center" spacing={1} sx={{ mb: 3 }}>
          {[...Array(4)].map((_, index) => (
            <Grid item key={index} xs={2} sm={1}>
              <Skeleton variant="rectangular" width={50} height={50} />
            </Grid>
          ))}
        </Grid>
        
        <Skeleton variant="rectangular" width={180} height={36} sx={{ mb: 3, alignSelf: 'center' }} />
        <Skeleton variant="rectangular" width="50%" height={44} sx={{ mb: 2, alignSelf: 'center' }} />
        
        <Skeleton variant="text" width="40%" sx={{ mt: 2, alignSelf: 'center' }} />
      </Container>
    );
  }

  return (
    <>
      
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Enter Verification Code
        </Typography>

        <Grid container justifyContent="center" spacing={1} sx={{ mb: 3 }}>
          {code.map((digit, index) => (
            <Grid item key={index} xs={2} sm={1}>
              <TextField
                id={`code-input-${index}`}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                inputProps={{
                  maxLength: 1,
                  style: { 
                    textAlign: 'center', 
                    fontSize: '1.5rem',
                    padding: '5px'
                  }
                }}
                sx={{
                  width: '50px',
                  '& .MuiOutlinedInput-root': {
                    height: '50px'
                  }
                }}
                variant="outlined"
                autoFocus={index === 0}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !digit && index > 0) {
                    document.getElementById(`code-input-${index - 1}`).focus();
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          onClick={sendVerificationCode}
          disabled={timer > 0 || isResending}
          sx={{ mb: 3, minWidth: '180px' }}
        >
          {isResending ? (
            <CircularProgress size={24} />
          ) : (
            `Resend code ${timer > 0 ? `(${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')})` : ''}`
          )}
        </Button>

        <Button
          variant="contained"
          size="large"
          onClick={handleVerify}
          disabled={code.some(d => d === '') || isLoading}
          sx={{ mb: 2, height: '44px', width: '50%' }}
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Verify'}
        </Button>

        <Typography sx={{ mt: 2 }}>
          <Link href="/login" underline="hover">
            Remembered your password? Sign in
          </Link>
        </Typography>
      </Container>
    </>
  );
}