import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Map, Marker, GeoJson, ZoomControl     } from "pigeon-maps";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import { BiMapPin, BiIdCard } from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi';
import { BsFacebook, BsLinkedin, BsTelephone  } from 'react-icons/bs';
import { SiGmail  } from 'react-icons/si';
import { FcElectronics, FcIdea, FcNoIdea  } from 'react-icons/fc';
import { FcFlashOn } from "react-icons/fc";

import { FaUserTie  } from 'react-icons/fa';
import { RiUserLocationLine, RiCake2Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { IoIosTrash } from 'react-icons/io';

const UserDetails = () => {

    const params = useParams();
    const [hue, setHue] = useState(0);
    const color = `hsl(${hue % 360}deg 39% 70%)`;
    const [user, setUser] = useState({});
    const [data, setData] = useState([0,1,2,3,4,5]);
    const [devices, setDevices] = useState([]);
    const [users, setUsers] = useState([]);
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

    const GetDevices = async () => {
        let result = await fetch(`http://localhost:4000/device/admin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                id: id
            })
        });

        let resultData = await result.json();
        if (resultData.success === true ) {
            setDevices(resultData.data);
        } else {
            swal(
                "Error!",
                resultData.message,
                "error"
            );
        }
    }

    const GetUsers_for_admin = async () => {
        let result = await fetch(`http://localhost:4000/user/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                id: id
            })
        });

        let resultData = await result.json();
        if (resultData.success === true ) {
            setUsers(resultData.data);
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
        GetDevices();
        GetUsers_for_admin();
    }, []);
    
  return (
    <div className="w-full px-10 pt-5">
        <div className='w-full p-3 flex flex-row bg-white shadow justify-between rounded items-center' >

            <div className="flex flex-row w-1/3 items-center">
               <p className="text-xl font-semibold mr-5">{user.nom} {user.prenom}</p>
               <BiMapPin className='text-gray-700 mr-0.5' size={20} />
               <p className=" font-semibold text-gray-700">{user.adress}</p>

            </div>

            
              
               

            
        </div>



        <div className="w-full flex flex-row pt-4">
            <div className="w-full lg:w-1/2 pr-2">
                <div className="w-full p-2 bg-white shadow rounded">
                    <Map 
                        height={362} 
                        defaultCenter={[36.809328, 10.086327]} 
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

                    <div className="w-full mt-4 flex flex-row">

                        <div className="w-1/2 pr-2 cursor-pointer  " onClick={() => { setDisplay('devices'); }} >
                            <div className="w-full bg-white rounded shadow p-2">
                                <div className="w-full flex flex-row justify-between px-1 items-end">
                                    <div>
                                        <p className="text-xl font-semibold mb-1">Devices</p>
                                        <p className="text-xl ml-2">{devices.length}</p>
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
                                        <p className="text-xl ml-2">{users.length}</p>
                                    </div>
                                    <FaUserTie className='' size={42} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                {/* </div> */}
            </div>
        </div>

        <div className="w-full flex flex-row pt-4">
            {display === 'devices' ?
                <div className="w-full grid grid-cols-5 gap-5 pb-5">
                    {devices.length === 0 ? 
                        <div className="absolute w-5/6 ml-10 flex justify-center bg-white shadow rounded py-2 px-3">
                            <p className='text-2xl text-gray-500 font-bold'>No Devices avliable</p>
                        </div>
                    :
                    
                        <>
                            {devices.map(({_id, name, deveui, devaddr, type, limunosite, intensite}, idx) => (
                                <div key={idx}>
                                    {/* card ////////////////// */}
                                    <div className=" flex flex-col bg-white shadow rounded py-2 px-3 divide-y">
                                    <div className="w-full flex flex-col items-center">
                                        <p className="text-xl mb-2">{name}</p>
                                        <div className="mb-2">
                                        
                                            <FcFlashOn className=''  size={65}  />
                                       
                                        </div>
                                        <input
                                            type="range"
                                            className=" form-range w-full "
                                            value={limunosite}
                                            id="customRange1"
                                            readOnly
                                        />
                                        <p>{limunosite}</p>
                                    </div>

                                    <div className="w-full flex flex-col mt-1 divide-y">
                                        <div className="my-2">
                                        <p>{deveui}</p>
                                        <p>{devaddr}</p>
                                        </div>
                                        {/* <div className="w-full flex flex-row justify-between my-2 items-center">
                                        <div className=" w-1/3 flex flex-row items-center justify-between">
                                            <FiEdit className='text-blue-900 cursor-pointer' size={30} />
                                            <IoIosTrash className='text-red-800 cursor-pointer' size={35}  />
                                        </div>
                                        <div>
                                            <Link className='underline decoration-solid text-blue-500 hover:text-blue-800' to={`/det_device/6272feb6c26d6aebefa85143`}>See Details</Link>
                                        </div>
                                        </div> */}
                                    </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </div>
            :
                <div className="w-full grid grid-cols-5 gap-5 pb-5">

                    {users.length === 0 ? 
                        <div className="absolute w-5/6 ml-10 flex justify-center bg-white shadow rounded py-2 px-3">
                            <p className='text-2xl text-gray-500 font-bold'>No Users avliable</p>
                        </div>
                    :
                    
                        <>
                            {users.map(({_id, nom, prenom, email, tel, adress, birthdate, avatar}, idx) => (
                                <div key={idx}>
                                    {/* user card ////////////////// */}
                                    <div className=" flex flex-col bg-white shadow rounded py-2 px-3 divide-y">
                                        <div className="w-full flex flex-col items-center">
                                            <img
                                                src={`http://localhost:4000/uploads/images/${avatar}`}
                                                className='w-24 h-auto rounded-full hover:shadow'
                                            />
                                            <p className="text-xl mb-2">{prenom} {nom}</p>
                                        </div>
                                        <div  className='w-full flex flex-col   '  >

                                            <div className="w-full flex flex-row items-center">
                                            <HiOutlineMail />
                                            <p className="ml-2">{email}</p>
                                            </div>

                                            <div className="w-full flex flex-row items-center">
                                            <BsTelephone />
                                            <p className="ml-2">{tel}</p>
                                            </div>

                                            <div className="w-full flex flex-row items-center">
                                            <RiUserLocationLine />
                                            <p className="ml-2">{adress}</p>
                                            </div>
                                            
                                            <div className="w-full flex flex-row items-center">
                                            <RiCake2Line />
                                            <p className="ml-2">{birthdate}</p>
                                            </div>
                                            
                                        </div>

                                        
                                    
                                    </div>
                                </div>
                            ))}   
                        </>
                    }
                </div>
            }
            
        </div>

        
    </div>
  )
}

export default UserDetails