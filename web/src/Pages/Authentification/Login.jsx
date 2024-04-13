import React, {useState, } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { path } from '../../utils/constants';
import { MdEmail } from 'react-icons/md';
import { BsLockFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Login = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();

        const result = await axios.post(`${path}user/login`,
        { 
            email: email,
            password: password
        });
        if (result.data.success === true) {
            swal(
              "Success!",
              result.data.message,
              "success"
            );
            let jsonvalue = JSON.stringify(result.data.data);
            cookies.set('user', jsonvalue);
            navigate('/');
            } else {
            swal(
              "Error!",
              result.data.message,
              "error"
            );
            }
    }
  return (
    <div className='w-full h-full flex flex-row' style={{marginTop: '-4vh'}}>
        <div className="w-1/2 flex justify-center items-center">
            <img 
                src={process.env.PUBLIC_URL + '/dhawini_login.png'} 
                className='w-full mt-24 h-auto'
                alt="login_image" 
            />
        </div>
        <div className="w-1/2 flex justify-center items-center ">
            <div className="w-4/5 border rounded shadow bg-white">
                <div className="w-full flex flex-row justify-center pt-6 p-4" >
                    <h1 className="text-3xl font-bold font-mono ">Login</h1>
                </div>
                <div className="w-full px-4 py-2">
                    <div className="w-full border" />
                </div>
                <div className="w-full px-6 py-2">
                    <form onSubmit={login}>
                        <div class="mb-6">
                            
                                
                            <label 
                                htmlFor="email" 
                                className="mb-2 text-sm font-medium text-gray-900 flex flex-row items-center dark:text-gray-300 text-gray-500"
                            >  <MdEmail size={20} /> <p className='ml-1 text-lg' > Email:</p></label>
                           
                            <input 
                                type="email" 
                                id="email" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="Email" 
                                required
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>
                        <div class="mb-6">
                            <label 
                                htmlFor="password" 
                                className="flex flex-row items-center  mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-gray-500"
                            > <BsLockFill size={20} /> <p className='ml-1 text-lg' >Password:</p></label>
                            <input 
                                type="password" 
                                id="password" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder='******'
                                value={password}
                                required
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col items-start mb-4">
                            <div className="w-full flex flex-row justify-between">
                                <div className='flex'>
                                    <div 
                                        className="flex items-center h-5"
                                    >
                                        <input 
                                            checked
                                            id="remember" 
                                            type="checkbox" 
                                            value="" 
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700  dark:focus:ring-blue-600 dark:ring-offset-gray-800" 
                                        />
                                    </div>
                                    <label htmlFor="remember" 
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >Remember me</label>
                                </div>
                               
                            </div>
                            <div className="w-full pt-8 ">
                                <div className="w-full border" />
                            </div>
                        </div>
                        <div className="w-full ">
                            <button type="submit" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text px-10 py-2 text-center mr-2 mb-2">Login</button>

                        </div>
                            
                    </form>

                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login