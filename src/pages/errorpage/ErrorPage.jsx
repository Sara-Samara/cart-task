import { Box, Typography, Button, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ code = 404, message = "Page Not Found" }) => {


  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', textAlign:'center' }}>
      <Box>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 150 }} />
        <Typography variant="h2" color="text.primary" gutterBottom sx={{ fontSize: 80 }}>
          {code}
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom sx={{ fontSize: 50 }}>
          {message}
        </Typography>
      </Box>
    </Container>
  );
};

export default ErrorPage;
