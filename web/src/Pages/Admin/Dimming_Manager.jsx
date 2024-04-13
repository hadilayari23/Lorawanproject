

import React from "react";
import { useRef, useEffect } from "react";
import * as d3 from "d3";
import GroupedButtons from '../../Components/GroupedButtons'


var pointRadialArr = [24];

const data = [
  { item: "12", count: 24 , x:'',y:''},
  { item: "01"},
  { item: "02", count: 24 , x:'',y:''},
  { item: "03"},
  { item: "04", count: 24 , x:'',y:''},
  { item: "05"},
  { item: "06", count: 24 , x:'',y:''},
  { item: "07"},
  { item: "08", count: 24 , x:'',y:''},
  { item: "09"},
  { item: "10", count: 24 , x:'',y:''},
  { item: "11"},
  { item: "12", count: 24 , x:'',y:''},
  { item: "13"},
  { item: "14", count: 24 , x:'',y:''},
  { item: "15"},
  { item: "16", count: 24 , x:'',y:''},
  { item: "17"},
  { item: "18", count: 24 , x:'',y:''},
  { item: "19"},
  { item: "20", count: 24 , x:'',y:''},
  { item: "21"},
  { item: "22", count: 24 , x:'',y:''},
  { item: "23"},
  
];
/////

/////
function Pie() {
  const pieChart = useRef();
<GroupedButtons/>

  useEffect(() => {
    //foooor
    for(let i = 0; i < 24; i += 1){
      pointRadialArr[i] = d3.pointRadial( (i / 12) * Math.PI, 195);
      data[i].x = d3.pointRadial( (i / 12) * Math.PI, 209)[0];
      data[i].y = d3.pointRadial( (i / 12) * Math.PI, 212)[1];
         
  }
  
    // Get positions for each data object
    const piedata = d3.pie().value((d) => d.count)(data);
    console.log(piedata);
    //Define arcs for graphing and labeling
    const arc = d3.arc().innerRadius(0).outerRadius(200);
    const colors = d3.scaleSequential(d3.interpolate( "orange","purple"))
    .domain([-1,20]);
    <GroupedButtons/>
    //Define the size and position of svg
    const svg = d3
      .select(pieChart.current)
      .attr("width", 600)
      .attr("height", 600)
      .append("g")
      .attr("transform", "translate(300,300)");

    //Draw Pie
    svg
      .append("g")
      .selectAll("path")
      .data(piedata)
      .join("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colors(i))
      .attr("stroke", "white")
      svg
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(d => d.item)
        .attr("x", d => d.x)
        .attr("y", d=> d.y)
        .attr("font-size", "15px")
        .attr("text-anchor", "middle")
        
        svg // adds the dots
        .selectAll("newCircle")
          .data(pointRadialArr)
          .enter()
          .append("circle")
          .attr("cx", d => d[0])
          .attr("cy", d => d[1])
          .attr("r", 2.5)
          
  });

  return (
    <div >
    <GroupedButtons/>
  
    <div id="chartArea">
      <svg ref={pieChart}></svg>
    </div>
    </div>
  );
}

export default Pie;



/*
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Time </StyledTableCell>
            <StyledTableCell align="right">Light Level</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
*/