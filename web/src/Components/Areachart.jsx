import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area   } from 'recharts';



// const data = [
//     {
//       name: '23/02',
//       pv: 24,

//     },
//     {
//       name: '24/02',
//       pv: 98,

//     },
//     {
//       name: '25/02',
//       pv: 98,

//     },
//     {
//       name: '26/02',
//       pv: 39,

//     },
//     {
//       name: '27/02',
//       pv: 40,

//     },
//     {
//       name: '28/02',
//       pv: 30,

//     },
//     {
//       name: '29/02',
//       pv: 40,

//     },
// ];

const Areachart = ({ id }) => {

    const [data, setData] = useState([]);

    // console.log(id);
    
    const fetchData = async () => {
        const result = await fetch('http://localhost:4000/luminosite/stats', {
            //method: 'GET',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            //body: JSON.stringify({
                id: id
            //})
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
    
  return (
    <ResponsiveContainer width='100%' height="100%">
        <AreaChart data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="full_date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {/* <ReferenceLine x="Page C" stroke="green" label="Min PAGE" /> */}
        <ReferenceLine y={100} label="Max" stroke="red" strokeDasharray="3 3" />
        <Area type="monotone" dataKey="val_luminosite" stroke="#570A57" fill="#5534A5" />
        </AreaChart>
    </ResponsiveContainer>
  )
}

export default Areachart