import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import { BiSearchAlt2 } from 'react-icons/bi';
import { FcIdea } from 'react-icons/fc';
import { FcNoIdea } from 'react-icons/fc';
import { FiEdit } from 'react-icons/fi';
import { IoIosTrash } from 'react-icons/io';
import { FcFlashOn } from "react-icons/fc";
import { FcFlashOff } from "react-icons/fc";
import { path } from '../../utils/constants';


const Devices = () => {

  const [lightOn, setLightOn] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const result = await fetch('http://localhost:4000/device', {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
      },
        
    })
    
    const resultData = await result.json();
    console.log(resultData.data);
    if (resultData.success === true ) {
      setData(resultData.data);
    } else{
      console.log(resultData);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const delete_device = async (id) => {
    let url, options;
    url = `${path}device/${id}`;
    options = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      }
    }
    const response = await fetch(url, options );

    let result = await response.json();
    console.log(result);
    if (result.success === true) {
      swal(
        "Success!",
        result.message,
        "success"
      );
      fetchData(); 
    } else {
      swal(
        "Error!",
        result.message,
        "error"
      );
    }

  }

  return (
    <div className="w-full px-10 pt-5">
      <div className='w-full p-3 flex flex-rox bg-white shadow justify-between rounded'>

        <div className="flex flex-row w-1/3 items-center">
            <input 
              placeholder='Search..'
              className='w-full appearance-none block px-2 py-1 bg-gray-200 text-gray-700 border rounded focus:outline-none focus:bg-white focus:border-gray-500'
            />

            <BiSearchAlt2 className='text-slate-500 cursor-pointer ' style={{marginLeft: '-20px'}} />
        </div>

        <div className="flex flex-row w-2/3 items-center justify-end">

          <p className='text-slate-600 font-medium'>Order By:</p>
          <select className='w-1/4 text-slate-600 border-0 focus:border-0 active:border-0 ml-3 font-medium '>
            <option> default</option>
            <option> option 01</option>
          </select>

          
            
        </div>
      </div>

      <div className="w-fll grid grid-cols-5 gap-5 mt-5 pb-5">
        
        {data.map(({_id, name, deveui, devaddr, type, limunosite, intensite}, idx) => (
          <div key={idx}>
            {/* card ////////////////// */}
            <div className=" flex flex-col bg-white shadow rounded py-2 px-3 divide-y">
              <div className="w-full flex flex-col items-center">
                <p className="text-xl mb-2">{name}</p>
                <div className="mb-2">
                  {lightOn ?
                    <FcFlashOn className='cursor-pointer'  size={65} onClick={() => setLightOn(!lightOn)} />
                  :
                    <FcFlashOff className='cursor-pointer'  size={65} onClick={() => setLightOn(!lightOn)} />
                  }
                </div>
                <input
                  type="range"
                  className=" form-range w-full "
                  value={limunosite}
                  id="customRange1"
                />
                <p>{limunosite}</p>
              </div>

              <div className="w-full flex flex-col mt-1 divide-y">
                <div className="my-2">
                  <p>{type}</p>
                  <p>{deveui}</p>
                  <p>{devaddr}</p>
                </div>
                <div className="w-full flex flex-row justify-between my-2 items-center">
                  <div className=" w-1/3 flex flex-row items-center justify-between">
                    
                  </div>
                  <div>
                    <Link className='underline decoration-solid text-blue-500 hover:text-blue-800' to={`/device/${_id}`}>See Details</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        
        


        
      </div>
    </div>
  )
}

export default Devices