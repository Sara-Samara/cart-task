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
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const isHome = location.pathname === '/';


  const handleNavigate = (path) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(path);
      setIsTransitioning(false);
    }, 500);
  };

  return (
      <Outlet />
  );
}