import React from 'react'
import light from './logo/lighting.jpg';

import {Link} from 'react-router-dom';

import {BsLinkedin} from 'react-icons/bs'
import {ImFacebook2} from 'react-icons/im'
import {ImLocation} from 'react-icons/im'
import {MdEmail} from 'react-icons/md'
import {SiGmail} from 'react-icons/si'
import {BsFillTelephoneFill} from 'react-icons/bs'
 //w-full flex justify-center
// //w-1/2 h-auto absolute z-0
function images(){

   return (
    <div className="w-full h-screen">
      <div className="image_cover w-full h-1/2 flex flex-col border items-center text-white"  >  
    
        {/* <img src={light}   alt="Logo"  className=' img1'   /> */}
        

        <h1 className='text-3xl font-bold text-center'>Contact </h1>
        <p className='text-xl font-semibold text-center ' > For more information , you will find all our contact details here. </p>

        <div className="w-full text-xl flex flex-row justify-center divide-x-4 mt-8">
          <div className='w-1/2 text-xl flex flex-row items-center justify-end pr-4 ml-20'  > <ImLocation className='mr-2' size={20}/>  Technopark EL-Ghazela,Ariana </div>
          <div className='w-1/2 text-xl flex flex-row items-center pl-4'  > <BsFillTelephoneFill  className='mr-2' size={18}/>   +21612345678 </div>
        </div>
      </div>
      <div className='flex flex-row justify-evenly mt-10'>
        <a href='https://www.facebook.com/' target='_blank'><ImFacebook2 className='cursor-pointer hover:shadow'  color='#0B84ED' size={30} /></a>
        <a href='/' target='_blank' ><BsLinkedin className='cursor-pointer hover:shadow'  color='#0A66C2' size={30} /></a>
        <a href='/' target='_blank' ><SiGmail className='cursor-pointer hover:shadow' color='#B02423' size={30} /></a>
      

      </div> 
    </div>
    
  )
  
  
  
}

export default images















