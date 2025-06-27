import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import '../../App.css'; 

const pages = ['Products', 'Login', 'Cart'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showLogin, setShowLogin] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="sticky" sx={{height: 'auto' , backgroundColor: '#fff', boxShadow:'none'}}>
      <Container disableGutters>
          <Toolbar
            disableGutters
            sx={{
              height: 'auto',
              minHeight: 'unset',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
          {/* Logo */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
            <Box
              component="img"
              src="/logo/logo-orange.webp"
              alt="logo"
              sx={{ height: 40 }}
              onClick={() => navigate(`/`)}
            />
          </Box>

          {/* Pages (Navbar links) */}
          <Box sx={{ flexGrow: 1, justifyContent: 'center', display: { xs: 'none', md: 'flex' }}}>
            {pages.map((page) => (
              <Button
                  key={page}
                  onClick={() => {
                  handleCloseNavMenu();
                  if (page === 'Cart') {
                    navigate('/cart');
                  } else if (page === 'Login') {
                    navigate('/login');
                  } else if (page === 'Products') {
                    navigate('/products');
                  }
                }}
                sx={{ mx: 1, color: '#101010' , fontWeight:'bold', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

 

           <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={() => setShowLogin(!showLogin)} sx={{ p: { xs: 1, sm: 1.5, md: 2 , '&:hover': { backgroundColor: 'transparent' }, borderRadius: 0,
    padding: 0} }}>
                <PersonOutlineIcon
                sx={{
                  width:{xs: 35,
                        sm: 35, 
                        md: 35, 
                        lg: 35, 
                        xl: 35 },

                  height:{xs: 35,
                        sm: 35, 
                        md: 35, 
                        lg: 35, 
                        xl: 35  },
                  '&:hover': {
                      backgroundColor: 'transparent', // إزالة خلفية التحويم
                    },           
                   }}/>
              </IconButton>


              <IconButton aria-label="cart" sx={{'&:hover': { backgroundColor: 'transparent' }}}>
                      <ShoppingCartIcon />
                  </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
