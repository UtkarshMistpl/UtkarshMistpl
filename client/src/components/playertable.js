import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import SimpleModalC from './simplemodalClub';
import ExcelForm from './excel_form';



export default function DataGridP() {


  const [playerList, setPlayer] = useState([]);
  const [rel, setRel] = useState(0);
  const [textcontainer , setText]= useState({
    display:"block",
    width: '120px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow:'ellipsis'
  });


  const changeText = ()=>{
    setText({});
  }
  function spStr(str){
    let res = str.replace(/,/g, ", ");
    alert(res);
  }
  function run(a){
    let res = "";
    console.log("s");

    // for (var i = 0; i <a.length; i++) { 
    //   // if(a[i]==','){
    //   // res += a[i]+" "; // or newString = newString + str[i];
    //   // }else{
    //   //   res += a[i];
    //   // }
    // }
    // let r =a.split(",");
    
    return res;
  }
  useEffect(() => {
    Axios.post('/club', {
       
    }).then((response) => {
      setPlayer(response.data.rows);
      console.log(playerList);
    });

  }, []);

  function change(name){
    Axios.post('/clubDelete', {
       name: name
    }).then((response) => {
      let c = rel+1;
      window.location.reload(); 
      alert("success");

    }); 
  }

  return (
    <div>

      {/* <ExcelForm table="club"/> */}
      <h4>Club List</h4>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              
              <TableCell>Delete </TableCell>
              <TableCell>Edit </TableCell>
              {/* <TableCell>Contact</TableCell>
              <TableCell>Professional</TableCell>
              <TableCell >Charge</TableCell>
              <TableCell >Available From</TableCell>
              <TableCell >Available To</TableCell>
              <TableCell >Day's at which available</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {playerList.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.address}</TableCell>
                
                <TableCell><span style={{color:"Blue", cursor:"pointer"}}  onClick={()=>{
                  let isExecuted = window.confirm("Are you sure to execute this action?");
                  if(isExecuted){
                    change(row.name)
                  } }}> Delete </span></TableCell>
                <TableCell> <SimpleModalC name={row.center_id} /> </TableCell>
                {/* <TableCell>{row.phone}</TableCell>
                <TableCell>{row.prof}</TableCell>
                <TableCell>{row.charge}</TableCell>
                <TableCell>{row._from}</TableCell>
                <TableCell>{row._to}</TableCell>
                <TableCell>{row.avail_day}</TableCell> */}        
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
     
    </div>

  );
}