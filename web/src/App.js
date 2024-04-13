import './App.css';
import { useContext, useState } from 'react';
import { MainContext } from './Hooks/Context/MainContext';
import { useLocation } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Cookies from 'universal-cookie';

import Login from './Pages/Authentification/Login';
import Register from './Pages/Authentification/Register';
import SideBar from './Components/SideBar';
import NavBar from './Components/NavBar';
import Mainroute from './Routes/Mainroute';
import Super_Admin_Route from './Routes/Super_Admin_Route';
import UserRoute from './Routes/UserRoute';

function App() {

  const cookies = new Cookies();

  let auth = cookies.get('user');
  console.log(auth);
  const location = useLocation();
  const { sideBaropen } = useContext(MainContext);
  
  return (
    <div className="App">
      <nav >
      {location.pathname === '/login' || location.pathname === '/register' ? 
        <>
        </>
      :
        <NavBar />
      }
      </nav>
      <main>
        {location.pathname === '/login' || location.pathname === '/register' ? 
          <>
          </>
        :
          <SideBar />
        } 
        <div className={ sideBaropen ? 'main active' : 'main'}>
          {auth ?
            <>
              {auth.status === '1'?
                <Super_Admin_Route />
                : 
                <>
                {auth.status === '2' ?
                <Mainroute />
                :
                <UserRoute />
              }
              </>
            }
            </>
            :
            <UserRoute />
          }
          {/* <Super_Admin_Route /> */}
          {/* <UserRoute /> */}
          
          
        </div>
      </main>
    </div>
  );
}

export default App;
