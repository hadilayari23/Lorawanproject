import React, { useContext, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { path } from '../utils/constants';

import { MainContext } from '../Hooks/Context/MainContext';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const NavBar = () => {

  const navigate = useNavigate();
  const cookies = new Cookies();
  let auth = cookies.get('user');
  const {sideBaropen, setSideBaropen} = useContext(MainContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpenNotif = Boolean(notifAnchorEl);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleNotifMenuOpen = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifMenuClose = () => {
    setNotifAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
    const notifId = 'primary-search-account-menu-notif';
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {auth ?
          <>
            
            <MenuItem onClick={() => {
              cookies.remove('user');
              window.location.reload();
              }}>Logout</MenuItem>
          </>
        :
          <>
            <MenuItem onClick={() => {
              navigate('/login')
              }}>Authenticate</MenuItem>
          </>
        }
      </Menu>
    );
    
    const renderMenunotif = (
      <Menu
        anchorEl={notifAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={notifId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpenNotif}
        onClose={handleNotifMenuClose}
        className='w-96 h-96'
      >


            
            <MenuItem  className='w-96  ' />
            <MenuItem  className='w-96  ' />
            <MenuItem  className='w-96  ' />
            <MenuItem  className='w-96  ' />
            <MenuItem  className='w-96  ' />
            <MenuItem  className='w-96  ' />
            <MenuItem  className='w-96  ' />
            <MenuItem  className='w-96  ' />
            <MenuItem  className='w-96  ' />
            <MenuItem  className='w-96  ' />
            <MenuItem  className='w-96  ' />
            <MenuItem  className='w-96  ' />

            <MenuItem 
              >    </MenuItem>  
            <MenuItem >    </MenuItem>

            <MenuItem 
              >    </MenuItem>
            <MenuItem >    </MenuItem>

            <MenuItem 
              >    </MenuItem>
          
        
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
       
      </Menu>
    );
  
    return (
      <Box sx={{ flexGrow: 1 }} >
        <AppBar component='div'  style={{backgroundColor: '#7C47ED'}}>
        <Toolbar >
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setSideBaropen(!sideBaropen)}
            >
            <MenuIcon />
            </IconButton>
            {/* <img src={`${path}uploads/images/logo.png`} alt="Emploi de temps"  style={{width: '90px'}}/> */}
            <p className='text-2xl font-mono font-bold' >Tech4IoT</p>
            {/* <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
            </Search> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                aria-haspopup="true"
                aria-controls={notifId}
                onClick={handleNotifMenuOpen}
            >
                <Badge badgeContent={17} color="error">
                <NotificationsIcon />
                </Badge>
            </IconButton>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
              {auth ? 
                <Avatar alt={auth.nom} src={`${path}uploads/images/${auth.avatar}`} style={{width: '30px', height: '30px'}} />
              :
                <AccountCircle /> 
              }
            </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
            >
                <MoreIcon />
            </IconButton>
            </Box>
        </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {renderMenunotif}
    </Box>
    )
}

export default NavBar