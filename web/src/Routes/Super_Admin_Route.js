import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';

import ReaquiredAuth from '../Pages/Authentification/ReaquiredAuth';
import Dashboard from '../Pages/super_admin/Dashboard';
import Devices from '../Pages/super_admin/Devices';
import UserDetails from '../Pages/super_admin/UserDetails';
import Users from '../Pages/super_admin/Users';
import Detail_Device from '../Pages/Detail_Device';
import Login from '../Pages/Authentification/Login';
import Register from '../Pages/Authentification/Register';
import Contact from '../Pages/Contact';

const Super_Admin_Route = () => {
  return (
    <Routes>
        
        <Route 
            path='/' 
            element={
                <ReaquiredAuth>
                    <Dashboard />
                </ReaquiredAuth>
            } 
        />
        
        <Route 
            path='/contact' 
            element={
                <ReaquiredAuth>
                    <Contact />
                </ReaquiredAuth>
            } 
        />

        <Route path='*' element={<Navigate to='/' replace />} />

       

        <Route 
            path='/users' 
            element={
                <ReaquiredAuth>
                    <Users />
                </ReaquiredAuth>
            } 
        />
        
        <Route 
            path='/user/:id' 
            element={
                <ReaquiredAuth>
                    <UserDetails />
                </ReaquiredAuth>
            } 
        />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default Super_Admin_Route