import React, { useContext, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { GiDoubleStreetLights } from 'react-icons/gi';
import { MainContext } from '../Hooks/Context/MainContext';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { FcElectronics, FcIdea, FcNoIdea  } from 'react-icons/fc';
import { MdOutlineSensors } from "react-icons/md";


const drawerWidth = 240;

const openedMixin = (theme) => ({
  position: 'fixed',
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  position: 'fixed',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    // marginTop: '64px',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const SideBar = () => {
  
  const cookies = new Cookies();

  let auth = cookies.get('user');
  const navigate = useNavigate();
  const {sideBaropen, setSideBaropen} = useContext(MainContext);
  const theme = useTheme();


  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  const handleDrawerClose = () => {
    setSideBaropen(false);
  };

  return (
    <Box sx={{ display: 'flex', }}  >
      {/* <CssBaseline /> */}
      <Drawer variant="permanent" open={sideBaropen}  >
        
        {/* <Divider /> */}
        <List >
          {/*Link to dashboard //////////// */}
         {auth &&
          auth.status === '1' ?
              <ListItemButton
              // key={text}
              sx={{
                minHeight: 48,
                justifyContent: sideBaropen ? 'initial' : 'center',
                px: 2.5,
              }}
              className='bg-black'
              onClick={() => navigate('/')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sideBaropen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
                // className='bg-black'
              >
                <DataUsageIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' sx={{ opacity: sideBaropen ? 1 : 0 }} />
            </ListItemButton>
          : null }
         


         
         {/*Link to All users //////////// */}
         {auth &&
          auth.status === '1' ?
            <ListItemButton
                // key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: sideBaropen ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate('/users')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sideBaropen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText primary='Users' sx={{ opacity: sideBaropen ? 1 : 0 }} />
              </ListItemButton>
            
           : null }
      {/* dashboooooordddd*/ }
      {auth &&
          auth.status === '2' ?
            <ListItemButton
                // key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: sideBaropen ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate('/dash')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sideBaropen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <DataUsageIcon />
                </ListItemIcon>
                <ListItemText primary='Dashboard' sx={{ opacity: sideBaropen ? 1 : 0 }} />
              </ListItemButton>
            
           : null }
         {/*Link to All users //////////// */}
         {auth &&
          auth.status === '2' ?
            <ListItemButton
                // key={text}
                sx={{
                  minHeight: 48,
                  justifyContent: sideBaropen ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate('/users')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sideBaropen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText primary='Users' sx={{ opacity: sideBaropen ? 1 : 0 }} />
              </ListItemButton>
            
           : null }

         
         {/*Link to divces //////////// */}
         

            
            {auth &&
          auth.status === '2' ?
            <ListItemButton
              // key={text}
              sx={{
                minHeight: 48,
                justifyContent: sideBaropen ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => navigate('/devices')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sideBaropen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MdOutlineSensors   size={30} />
              </ListItemIcon>
              <ListItemText primary='Devices' sx={{ opacity: sideBaropen ? 1 : 0 }} />
            </ListItemButton>
          : null }
          





     {/* njrb wa7diiiiiiiiiiiiiiiiiiiii*/}

{/*{auth &&
          auth.status === '2' ?
            <ListItemButton
              // key={text}
              sx={{
                minHeight: 48,
                justifyContent: sideBaropen ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => navigate('/Dimming_Manager')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sideBaropen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <CalendarMonthIcon size={30} />
              </ListItemIcon>
              <ListItemText primary='Dimming Manager' sx={{ opacity: sideBaropen ? 1 : 0 }} />
            </ListItemButton>
          : null }*/}
  {/* ******************************************* */}






















          <ListItemButton
            // key={text}
            sx={{
              minHeight: 48,
              justifyContent: sideBaropen ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => navigate('/contact')}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: sideBaropen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <ContactPhoneIcon  size={30} />
            </ListItemIcon>
            <ListItemText primary='Contact' sx={{ opacity: sideBaropen ? 1 : 0 }} />
          </ListItemButton>








         
          
        </List>
        {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: sideBaropen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sideBaropen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: sideBaropen ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List> */}
      </Drawer>
    </Box>
  );
}


export default SideBar