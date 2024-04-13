import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';



const Linechart = ({data}) => {

  // const [data, setData] = useState([]);

  //  console.log(DevEUI);
  
  // const fetchData = async () => {
  //     // const result = await fetch('http://localhost:4000/user/oss', {
  //       const result = await axios.post('http://localhost:4000/user/oss', {
  //           DevEUI: DevEUI
  //       })
         
    
      console.log(data);
  //     if (result.data.success) {
  //         setData(result.data.data);
  //     } else{
  //         console.log(result);
  //     }
  // }

  // useEffect(() => {
  //     fetchData();
  // }, []);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Linechart