import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import Linechart from '../Components/Linechart';
import Barchart from '../Components/Barchart';
import Areachart from '../Components/Areachart';


const Detail_Device = ({ navigation }) => {

    const params = useParams();
    const { id } = params;
    const [ device, setDevice] = useState({});
    const [ data, setData ] = useState({});

    // console.log(id);
    const fetchData = async () => {
      // const result = await fetch('http://localhost:4000/user/oss', {
        const result = await axios.get(`http://localhost:4000/device/${id}`)
         
    
      console.log(result.data.data);
      if (result.data.success) {
          setDevice(result.data.data);
      } else{
          console.log(result);
      }
    
        const line = await axios.post('http://localhost:4000/user/oss', {
            DevEUI: result.data.data.deveui
        })
         
    
    //   console.log(result.data);
      if (line.data.success) {
          setData(line.data.data);
      } else{
          console.log(result);
      }
  }

    useEffect(() => {
      fetchData();
    }, []);

    
  return (
    <div className='w-full h-screen  p-4' >
        <div className="w-full h-3/4 flex flex-row">

            <div className="w-1/2 h-2/3 p-4">
                <div className="w-full h-full rounded bg-white shadow pt-4 hover:shadow-xl">
                    <Linechart data={data} />
                </div>
            </div>
            
            <div className="w-1/2 h-2/3 p-4">
                <div className="w-full h-full rounded bg-white shadow pt-4 hover:shadow-xl">
                    <Barchart data={data} />
                </div>
            </div>

        </div>
    </div>
  )
}

export default Detail_Device