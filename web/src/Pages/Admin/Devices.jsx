
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Modal from 'react-modal';
import Cookies from 'universal-cookie';
import axios from 'axios';

import { BiSearchAlt2 } from 'react-icons/bi';
import { FcFlashOn } from "react-icons/fc";
import { FcFlashOff } from "react-icons/fc";

import { FcIdea } from 'react-icons/fc';
import { FcNoIdea } from 'react-icons/fc';
import { FiEdit } from 'react-icons/fi';
import { IoIosTrash } from 'react-icons/io';


import { path } from '../../utils/constants';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '45vw',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100,
  },
};

const Devices = () => {

  const cookies = new Cookies();

  let auth = cookies.get('user');
  console.log('====================================');
  console.log(auth._id);
  console.log('====================================');
  const [lightOn, setLightOn] = useState(false);
  const [data, setData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [deveui, setDeveui] = useState('');
  const [devaddr, setDevaddr] = useState('');
  const [type, setType] = useState('');
  const [intensite, setIntensite] = useState('');
  const [limunosite, setLimunosite] = useState('');
  const [action, setAction] = useState('add');
  const [id, setId] = useState('');
  const [search, setSearch] = useState('');
  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);

  let subtitle;
  function openModal() {
    setIsOpen(true);
  }
  Modal.setAppElement('#root');
  
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  
  function closeModal() {
    setIsOpen(false);
    setName('');
    setDevaddr('');
    setDeveui('');
    setType('');
    setLimunosite('');
    setIntensite('');
    setAction('add');
  }
  
  const fetchData = async () => {
    const result = await fetch('http://localhost:4000/device', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: auth._id
      })
        
    })
    
    const resultData = await result.json();
    console.log(resultData.data);
    if (resultData.success === true ) {
      setData(resultData.data);
      setfilterData(resultData.data);
      setmasterData(resultData.data);
    } else{
      console.log(resultData);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const searchFilter = (text) => {
    if(text) {
      const NewData = masterData.filter((item) => {
          const itemData = item.deveui ? item.deveui.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setfilterData(NewData);
      setSearch(text);
    } else {
      setfilterData(masterData);
      setSearch(text);
    }
  }

  const onchange = (e) => {
    if(e.target.name === 'name'){
      setName(e.target.value);
    } else if(e.target.name === 'deveui'){
      setDeveui(e.target.value);
    } else if(e.target.name === 'devaddr'){
      setDevaddr(e.target.value);
    } else if(e.target.name === 'intensite'){
      setIntensite(e.target.value);
    } else if(e.target.name === 'limunosite'){
      setLimunosite(e.target.value);
    } else if(e.target.name === 'type'){
      setType(e.target.value);
    } 

  }

  const update = (item) => {
    setName(item.name);
    setDeveui(item.deveui);
    setDevaddr(item.devaddr);
    setIntensite(item.intensite);
    setLimunosite(item.limunosite);
    setType(item.type);
    setId(item._id);
    setAction('update');

    openModal();
  }
 
  const Submit = async (e) => {
    e.preventDefault();

    if (type === '') {
      return swal(
        "Warning!",
        'please pick a type for the device',
        "warning"
      );
    }
    let options, url;
    if(action === 'add') {
      url = `${path}device/add`;
      options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          deveui: deveui,
          devaddr: devaddr,
          limunosite: limunosite,
          intensite: intensite,
          type: type,
          id_user: auth._id
        })
      }
    } else {
      url = `${path}device/${id}`;
      options = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          deveui: deveui,
          devaddr: devaddr,
          limunosite: limunosite,
          intensite: intensite,
          type: type
        })
      }
    }
    // console.log(options );
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
      closeModal();
    } else {
      swal(
        "Error!",
        result.message,
        "error"
      );
    }
  }

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

  const changeState = async ( active) => {

    const result = await axios.post(`http://localhost:4000/device/state`,  {active: active});
    console.log(result.data);
    if (result.data.success){
      await axios.get('http://localhost:4000/py').then(success =>  console.log('done')).catch(error => console.log(error))
      fetchData(); 
    } 
  }

  return (
    <div className="w-full px-10 pt-5">
      <div className='w-full p-3 flex flex-rox bg-white shadow justify-between rounded'>

        <div className="flex flex-row w-1/3 items-center">
            <input 
              placeholder='Search..'
              className='w-full appearance-none block px-2 py-1 bg-gray-200 text-gray-700 border rounded focus:outline-none focus:bg-white focus:border-gray-500'
              onChange={(e)=> searchFilter(e.target.value)}
              value={search}
            />

            <BiSearchAlt2 className='text-slate-500 cursor-pointer ' style={{marginLeft: '-20px'}} />
        </div>
      <div className="flex flex-row w-2/3 items-center justify-end">

                
                
                <button 
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                  onClick={openModal}
                >
                  <span className="relative px-2 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded group-hover:bg-opacity-0">
                    Add Device
                  </span>
                </button>

            </div>

       
      </div>

      <div className="w-fll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5 pb-5">
        
        {filterData.map(({_id, name, deveui, devaddr, type, limunosite, intensite, active}, idx) => (
          <div key={idx}>
            {/* card ////////////////// */}
            <div className=" flex flex-col bg-white shadow rounded py-2 px-3 divide-y">
              <div className="w-full flex flex-col items-center">
                <p className="text-xl mb-2">{name}</p>
                
                  <div className="mb-2">
                    {active ==="01" ?
                      <FcFlashOn  className='cursor-pointer'  size={65} onClick={() => changeState("00")} />
                      :
                      <FcFlashOff className='cursor-pointer'  size={65} onClick={() => changeState("01")} />
                    }
                  </div>
                
                {/* ???? */}
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
                  <p>Type: {type}</p>
                  <p>DevEUI: {deveui}</p>
                </div>
                <div className="w-full flex flex-row justify-between my-2 items-center">
                  <div className=" w-1/3 flex flex-row items-center justify-between">
                    <FiEdit className='text-blue-900 cursor-pointer' size={30} onClick={() => update({_id, name, deveui, devaddr, type, limunosite, intensite})} />
                    <IoIosTrash className='text-red-800 cursor-pointer' size={35}  onClick={() => delete_device(_id)}/>
                  </div>
                  <div>
                    <Link className='underline decoration-solid text-blue-500 hover:text-blue-800' to={`/device/${_id}`}>See Details</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        
        
<Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="w-full h-full">
          <form onSubmit={Submit}>
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
              <div>
                  
                <input  
                  type="text" 
                  id="name" 
                  name='name' 
                  placeholder="Name" 
                  value={name}
                  onChange={(e) => onchange(e)}
                  // onChange={(e) => onchange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required  
                />
              </div>
              <div>
                  
                <input 
                  type="text" 
                  id="deveui" 
                  placeholder="deveui" 
                  name='deveui'
                  value={deveui}
                  onChange={(e) => onchange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required  
              />
              </div>
              <div>
              
                <input 
                  type="text" 
                  id="devaddr" 
                  placeholder="devaddr" 
                  name='devaddr'
                  value={devaddr}
                  onChange={(e) => onchange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required  
                />
              </div>  
              <div>
                  
                <input 
                  type="number" 
                  id="intensite" 
                  placeholder="intensite"  
                  name='intensite'
                  value={intensite.toString()}
                  onChange={(e) => onchange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required  
              />
              </div>
              
              <div>
                  
                <input 
                  type="number" 
                  id="limunosite" 
                  placeholder="limunosite"  
                  name='limunosite'
                  value={limunosite.toString()}
                  onChange={(e) => onchange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required  
              />
              </div>

              <div >
                <select 
                  className="form-select appearance-none
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                    name='type'
                    value={type}
                    onChange={(e) => onchange(e)}
                  >
                    <option selected>Choose the type of the device</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="AquaOptim">AquaOptim</option>
                </select>
              </div>
              

            </div>
            
            

            <button 
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              // onClick={Submit}
            >
              <span className="relative px-2 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded group-hover:bg-opacity-0">
                Submit
              </span>
            </button>
          </form>
        </div>
      </Modal>
          
        
      </div>
    </div>
  )
}

export default Devices