
/*

import React, { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { GiWallet } from 'react-icons/gi';
import { IoWalletOutline } from 'react-icons/io5';
import  { TiLightbulb } from 'react-icons/ti';
import  { FaUserTie } from 'react-icons/fa';
import axios from 'axios';

import Linechart from '../../Components/Linechart';
import Barchart from '../../Components/Barchart';
import Maps from '../../Components/Maps';
import { useParams } from 'react-router-dom';
import Areachart from '../../Components/Areachart'

const Dashboard = () => {

  

 
   const params = useParams();
    const { id } = params;
  
 return (

  
    <div className='w-full h-screen  p-4' >





        <div className="w-full h-3/4 flex flex-row">

           
            
            <div className="w-full h-full p-4">
              <p className='text-2xl font-mono font-bold'> Energie saving </p>
                <div className="w-full h-full rounded bg-white shadow pt-4 hover:shadow-xl">
                    <Areachart id={id} />
                </div>
            </div>

        </div>

    </div>

//////////////////

  )


}

export default Dashboard

*/


import React from 'react'

function Dashboard() {
  return (
    <div>Dashboard
   
    </div>
  )
} 


export default Dashboard


