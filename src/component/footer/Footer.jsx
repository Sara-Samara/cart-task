import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2',
        color: '#fff',
        py: 2,
        px: 4,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Footer
      </Typography>
    </Box>
  );
};

export default Footer;
