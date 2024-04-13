import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FcIdea, FcNoIdea } from 'react-icons/fc';
import { FiEdit } from 'react-icons/fi';
import { IoIosTrash } from 'react-icons/io';
import { HiOutlineMail } from 'react-icons/hi';
import { BsTelephone } from 'react-icons/bs';
import { RiUserLocationLine, RiCake2Line } from 'react-icons/ri';

import Modal from 'react-modal';

import { Link } from 'react-router-dom';
import swal from 'sweetalert';
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

const Users = () => {

  const navigate = useNavigate();
  const [lightOn, setLightOn] = useState(false);
  const [data, setData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState('add');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [adress, setAdress] = useState('');
  const [id, setId] = useState('');
  let subtitle;

  const fetchUsers = async () => {

    let result = await fetch(`http://localhost:4000/user`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        id: '2'
      })
    });
    let resultData = await result.json();
    if (resultData.success) {
        setData(resultData.data);
    } else {
        swal(
            "Error!",
            resultData.message,
            "error"
        );
    }
  }

  useEffect(() => {
      fetchUsers();
  }, []);
    
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
    setNom('');
    setPrenom('');
    setBirthdate('');
    setTel('');
    setEmail('');
    setAdress('');
    setId('');
    setAction('add');
  }

  const onchange = (e) => {
    if(e.target.name === 'nom'){
      setNom(e.target.value);
    } else if(e.target.name === 'prenom'){
      setPrenom(e.target.value);
    } else if(e.target.name === 'birthdate'){
      setBirthdate(e.target.value);
    } else if(e.target.name === 'tel'){
      setTel(e.target.value);
    } else if(e.target.name === 'email'){
      setEmail(e.target.value);
    } else if(e.target.name === 'adress'){
      setAdress(e.target.value);
    }

  }

  const update = (item) => {
    setNom(item.nom);
    setPrenom(item.prenom);
    setBirthdate(item.birthdate);
    setTel(item.tel);
    setEmail(item.email);
    setAdress(item.adress);
    setId(item._id);
    setAction('update');

    openModal();
  }

  const Submit = async (e) => {
    e.preventDefault();
    // console.log(id);
    // console.log(action);
    // console.log(birthdate);
    // console.log(tel);
    // console.log(adress);
    // console.log(email);
    let options, url;
    if(action === 'add') {
      url = `${path}user/admin_register`;
      options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          nom: nom,
          prenom: prenom,
          tel: tel,
          adress: adress,
          birthdate: birthdate,
          status: '2',
        })
      }
    } else {
      url = `${path}user/${id}`;
      options = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          nom: nom,
          prenom: prenom,
          tel: tel,
          adress: adress,
          birthdate: birthdate,
        })
      }
    }
    console.log(options );
    const response = await fetch(url, options );

    let result = await response.json();
    console.log(result);
    if (result.success === true) {
      swal(
        "Success!",
        result.message,
        "success"
      );
      fetchUsers();
      closeModal();
    } else {
      swal(
        "Error!",
        result.message,
        "error"
      );
    }
  }

  const delete_user = async (id) => {
    let url, options;
    url = `${path}user/${id}`;
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
      fetchUsers(); 
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

                
                
                <button 
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                  onClick={openModal}
                >
                  <span className="relative px-2 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded group-hover:bg-opacity-0">
                    Add User
                  </span>
                </button>

            </div>
        </div>

        <div className="w-fll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5 pb-5">

        {data.map(({_id, nom, prenom, email, avatar, tel, adress, birthdate}, idx) => (
          <div key={idx}>
            {/* card ////////////////// */}
            <div className=" flex flex-col bg-white shadow rounded py-2 px-3 divide-y">
              <div 
                className="w-full flex flex-col items-center cursor-pointer" 
                onClick={()=> navigate(`/user/${_id}`)}
              >
                  <img
                    src={`http://localhost:4000/uploads/images/${avatar}`}
                    className='w-24 h-auto rounded-full hover:shadow'
                  />
                <p className="text-xl mb-2">{prenom} {nom}</p>
              </div>
              <div  
                className='w-full flex flex-col cursor-pointer'
                onClick={()=> navigate(`/user/${_id}`)}
              >

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

              <div className="w-full flex flex-col mt-1 divide-y">
                
                <div className="w-full flex flex-row justify-between items-center pt-2">

                <button 
                  className="w-1/2 relative inline-flex items-center justify-center  mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                  onClick={() => update({_id, nom, prenom, email, tel, birthdate, adress})}
                >
                  <span className="w-full relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
                      Update
                  </span>
                </button>
                
                <button 
                  className=" w-1/2 relative inline-flex items-center justify-center mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                  onClick={() => delete_user(_id)}
                >
                  <span className="w-full relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0">
                    Delete
                  </span>
                </button>
                  
                </div>
              </div>
            </div>
          </div>
        ))}

        
        


        
      </div>

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
                  id="first_name" 
                  name='nom' 
                  placeholder="Nom" 
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  // onChange={(e) => onchange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required  
                />
              </div>
              <div>
                  
                <input 
                  type="text" 
                  id="last_name" 
                  placeholder="Prenom" 
                  name='prenom'
                  value={prenom}
                  onChange={(e) => onchange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required  
              />
              </div>
              <div>
              
                <input 
                  type="date" 
                  id="company" 
                  placeholder="Birthdate" 
                  name='birthdate'
                  value={birthdate}
                  onChange={(e) => onchange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required  
                />
              </div>  
              <div>
                  
                <input 
                  type="number" 
                  id="phone" 
                  placeholder="123-45-678"  
                  name='tel'
                  value={tel.toString()}
                  onChange={(e) => onchange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required  
              />
              </div>
              <div>

                <input 
                  type="email" 
                  id="website" 
                  placeholder="Email" 
                  name='email'
                  value={email}
                  onChange={(e) => onchange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required
                />
              </div>

            </div>
            <div className="mb-6">

              <input 
                type="text" 
                id="adress" 
                placeholder="Adress" 
                name='adress'
                value={adress}
                onChange={(e) => onchange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required  
              />
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
  )
}

export default Users