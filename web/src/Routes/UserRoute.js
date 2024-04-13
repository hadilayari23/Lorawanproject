import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';

import Devices from '../Pages/User/Devices';
import ReaquiredAuth from '../Pages/Authentification/ReaquiredAuth';
import Detail_Device from '../Pages/Detail_Device';
import Login from '../Pages/Authentification/Login';
import Register from '../Pages/Authentification/Register';

const UserRoute = () => {
  return (
    <Routes>


        <Route 
            path='/' 
            element={
                <ReaquiredAuth>
                    <Devices />
                </ReaquiredAuth>
            } 
        />
        
        <Route 
            path='/devices' 
            element={
                <ReaquiredAuth>
                    <Devices />
                </ReaquiredAuth>
            } 
        />

        <Route 
            path='/device/:id' 
            element={
                <ReaquiredAuth>
                    <Detail_Device />
                </ReaquiredAuth>
            } 
        />

        <Route path="*"
            element={<Navigate to="/login" replace />}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default UserRoute