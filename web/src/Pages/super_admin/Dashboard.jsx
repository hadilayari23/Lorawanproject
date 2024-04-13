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

const Dashboard = () => {

  const [data, setData] = useState({
    admins: 0,
    users: 0,
    devices: 0
  })

  const fetchData = async () => {

    const data = await axios.get('http://localhost:4000/stats');
    console.log(data.data);
    setData(data.data.data);

  }

  useEffect(() => {
    fetchData();
  }, [])
  
  return (
    
    <div className='w-full h-screen  p-4' >
      <div className="w-full h-1/5 flex flex-row ">

        <div className="w-1/4 p-2" >
          
          <div className="w-full h-full  rounded-lg shadow-xl bg-white hover:shadow-xl flex flex-col  ">
            <p className='text-xl font-bold mt-2 ml-4 flex items-center' >Admins</p>
            <div className='w-full flex justify-between px-2 mt-4'>
            <p className='text-lg' >{data.admins}</p>
              <FaUserTie  className='mr-2 text-violet-900'  size={25}/>
            </div>
          </div>
        </div>
        
        

        
        <div className="w-1/4 p-2">
          <div className="w-full h-full rounded-lg shadow-xl bg-white	 hover:shadow-xl flex flex-col  ">
            <p className='text-xl font-bold mt-2 ml-4 flex items-center' >Users</p>
            <div className='w-full flex justify-between px-2 mt-4'>
            <p className='text-lg' >{data.users} </p>
              <FaRegUser className='mr-2 text-violet-900 '  size={25}/>
            </div>
          </div>
        </div>
        
        
        <div className="w-1/4 p-2">
          <div className="w-full h-full rounded-lg shadow-xl bg-white hover:shadow-xl flex flex-col  ">
            <p className='text-xl font-bold mt-2 ml-4 flex items-center' >Totale devices</p>
            <div className='w-full flex justify-between px-2 mt-4'>
            <p className='text-lg' >{data.devices}</p>
              <TiLightbulb className='mr-2 text-violet-900 '  size={25}/>
            </div>
          </div>
        </div>
        

        <div className="w-1/4 p-2">
          <div className="w-full h-full rounded-lg shadow-xl bg-white hover:shadow-xl flex flex-col  ">
            <p className='text-xl font-bold mt-2 ml-4 flex items-center' >Money</p>
            <div className='w-full flex justify-between px-2 mt-4'>
            <p className='text-lg' >1228 Dt</p>
              <IoWalletOutline className='mr-2 text-violet-900 '  size={25}/>
            </div>
          </div>
        </div>

        
      </div>
      <div className="w-full h-3/4 flex flex-row">

        <div className="w-full h-full p-2.5">
          <div className="w-full h-full rounded-lg bg-white shadow-xl p-2 hover:shadow-xl">
            <Maps  />
          </div>
        </div>

        {/* <div className="w-full h-full p-3">
          <div className="w-full h-full rounded bg-white shadow p-5 pt-5 hover:shadow-xl">
            <Barchart />
          </div>
        </div> */}

      </div>
    </div>

)



}

export default Dashboard