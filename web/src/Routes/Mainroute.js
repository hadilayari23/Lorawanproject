import React from 'react'
import {Routes, Route} from 'react-router-dom';


import ReaquiredAuth from '../Pages/Authentification/ReaquiredAuth';
import Login from '../Pages/Authentification/Login';
import Register from '../Pages/Authentification/Register';
import Devices from '../Pages/Admin/Devices';
import Profile from '../Pages/Authentification/Profile';
import Users from '../Pages/Admin/Users';
import UserDetails from '../Pages/Admin/UserDetails';
import Detail_Device from '../Pages/Detail_Device';
import Contact from '../Pages/Contact';
import Dashboard from "../Pages/Admin/Dashboard";
import Dimming_Manager from "../Pages/Admin/Dimming_Manager";


const Mainroute = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ReaquiredAuth>
            <Users />
          </ReaquiredAuth>
        }
      />

      <Route
        path="/devices"
        element={
          <ReaquiredAuth>
            <Devices />
          </ReaquiredAuth>
        }
      />
      <Route
        path="/dash"
        element={
          <ReaquiredAuth>
            <Dashboard />
          </ReaquiredAuth>
        }
      />

      <Route
        path="/users"
        element={
          <ReaquiredAuth>
            <Users />
          </ReaquiredAuth>
        }
      />

      <Route
        path="/user/:id"
        element={
          <ReaquiredAuth>
            <UserDetails />
          </ReaquiredAuth>
        }
      />

      <Route
        path="/device/:id"
        element={
          <ReaquiredAuth>
            <Detail_Device />
          </ReaquiredAuth>
        }
      />

      <Route
        path="/contact"
        element={
          <ReaquiredAuth>
            <Contact />
          </ReaquiredAuth>
        }
      />
 <Route
        path="/Dimming_Manager"
        element={
          <ReaquiredAuth>
            <Dimming_Manager />
          </ReaquiredAuth>
        }
      />





      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Mainroute