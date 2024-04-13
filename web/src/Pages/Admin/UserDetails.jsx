import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Map, Marker, GeoJson, ZoomControl     } from "pigeon-maps";
import { Link } from 'react-router-dom';

import { BiMapPin, BiIdCard } from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi';
import { BsFacebook, BsLinkedin, BsTelephone  } from 'react-icons/bs';
import { SiGmail  } from 'react-icons/si';
import { FcElectronics, FcIdea, FcNoIdea  } from 'react-icons/fc';
import { FaUserTie  } from 'react-icons/fa';
import { RiUserLocationLine, RiCake2Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { IoIosTrash } from 'react-icons/io';
import swal from 'sweetalert';

const UserDetails = () => {

    const params = useParams();
    const [hue, setHue] = useState(0);
    const color = `hsl(${hue % 360}deg 39% 70%)`;
    const [data, setData] = useState([1,2,3,4,5]);
    const [user, setUser] = useState({});
    const [lightOn, setLightOn] = useState(false);
    const [display, setDisplay] = useState('devices')

    const { id } = params;
    const getuser = async () => {
        let result = await fetch(`http://localhost:4000/user/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }, 
       
        });
        let resultData = await result.json();
        if (resultData.success === true ) {
            setUser(resultData.data);
        } else {
            swal(
                "Error!",
                resultData.message,
                "error"
            );
        }
    }

    useEffect(() => {
        getuser();

    }, []);
    
  return (
    <div className="w-full px-10 pt-5">
        <div className='w-full p-3 flex flex-row bg-white shadow justify-between rounded items-center' >

            <div className="flex flex-row w-1/3 items-center">
                <p className="text-xl font-semibold mr-5">{user.nom} {user.prenom}</p>
               <BiMapPin className='text-gray-700 mr-0.5' size={20} />
               <p className=" font-semibold text-gray-700">{user.adress}</p>

            </div>

            
              
                <button 
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                //   onClick={openModal}
                >
                  <span className="relative px-2 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded group-hover:bg-opacity-0">
                    Add Device
                  </span>
                </button>

            
        </div>



        <div className="w-full flex flex-row pt-4">
            <div className="w-full lg:w-1/2 pr-2">
                <div className="w-full p-2 bg-white shadow rounded">
                    <Map 
                        height={362} 
                        defaultCenter={[34.98079481244147, 9.40484921475877]} 
                        defaultZoom={6}
                        onClick={({ event, latLng, pixel }) => {
                            console.log('map was clicked');
                            // console.log(event);
                            console.log(latLng);
                            // console.log(pixel);
                        }}
                    >
                        <ZoomControl />
                        <Marker 
                            width={50}
                            anchor={[34.98079481244147, 9.40484921475877]} 
                            color={color} 
                            onClick={() => setHue(hue + 50)} 
                        />
                    </Map>
                </div>
            </div>
            <div className="w-full lg:w-1/2 pl-2 ">
                {/* <div className="w-full "> */}
                    {/* <div className="w-full flex flex-row items-center">
                        <HiOutlineMail size={23} />
                        <p className="ml-2 font-semibold">Email@gmail.com</p>
                    </div>
                    <div className="w-full flex flex-row items-center">
                        <HiOutlineMail size={23} />
                        <p className="ml-2 font-semibold">Email@gmail.com</p>
                    </div>
                    <div className="w-full flex flex-row items-center">
                        <HiOutlineMail size={23} />
                        <p className="ml-2 font-semibold">Email@gmail.com</p>
                    </div> */}
                    <div className="w-full">
                        <div className="w-full flex flex-col flex-wrap p-2  bg-white shadow rounded">
                            <div className="w-full flex justify-center mb-6">
                                <img
                                    src={`http://localhost:4000/uploads/images/${user.avatar}`}
                                    className='w-28 h-auto rounded-full hover:shadow'
                                />
                           </div>
                            <div className='w-full flex flex-row divide-x'>
                                <div className='w-1/2'>
                                    <p className="ml-2 text-xl  flex flex-row"><BiIdCard size={25} /> {user.nom} {user.prenom}</p>
                                    <p className="ml-2 text-xl  flex flex-row"><HiOutlineMail size={25} /> {user.email}</p>
                                </div>
                                <div className='pl-2'>
                                    <p className="ml-2  text-xl flex flex-row"><BiIdCard size={25} /> {user.tel}</p>
                                    <p className="ml-2  text-xl flex flex-row"><RiCake2Line size={25} /> {user.birthdate}</p>
                                </div>
                            </div>

                            <div className="w-full flex flex-row justify-evenly px-4 mt-10 mb-4">
                                <BsFacebook className='cursor-pointer' color='#139CF8' size={30} />
                                <BsLinkedin className='cursor-pointer' color='#0A66C2' size={30} />
                                <SiGmail className='cursor-pointer' color='#B12424' size={30} />
                            </div>
                        </div>
                    </div>

                    {/* <div className="w-full mt-4 flex flex-row">

                        <div className="w-1/2 pr-2 cursor-pointer  " onClick={() => setDisplay('devices')} >
                            <div className="w-full bg-white rounded shadow p-2">
                                <div className="w-full flex flex-row justify-between px-1 items-end">
                                    <div>
                                        <p className="text-xl font-semibold mb-1">Devices</p>
                                        <p className="text-xl ml-2">24</p>
                                    </div>
                                    <FcElectronics className='' size={45} />
                                </div>
                            </div>
                        </div>

                        <div className="w-1/2 pl-2 cursor-pointer " onClick={() => setDisplay('users')} >
                        <div className="w-full bg-white rounded shadow p-2">
                                <div className="w-full flex flex-row justify-between px-1 items-end">
                                    <div>
                                        <p className="text-xl font-semibold mb-1">Users</p>
                                        <p className="text-xl ml-2">24</p>
                                    </div>
                                    <FaUserTie className='' size={42} />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    
                {/* </div> */}
            </div>
        </div>

        

        
    </div>
  )
}

export default UserDetails