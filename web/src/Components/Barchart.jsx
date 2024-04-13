import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




const Barchart = ({data}) => {
  // const [data, setData] = useState([]);

//  const fetchData = async () => {
//       const result = await fetch('http://localhost:4000/user/oss', {
//           method: 'GET',
//           // method: 'POST',
//           headers: {
//               "Content-Type": "application/json",
//           },
//          // body: JSON.stringify({
//            //  DevEUI:DevEUI
//            //})
//       })
    
//     const resultData = await result.json();
//     console.log(resultData.data);
//     if (resultData.success === true ) {
//         setData(resultData.data);
//     } else{
//         console.log(resultData);
//     }
//   }
  
//   useEffect(() => {
//     fetchData();
//   }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
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
        <Bar dataKey="humidity" fill="#4774bf" />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
    </ResponsiveContainer>
  )
      }

export default Barchart