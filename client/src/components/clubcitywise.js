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



export default function ClubCityWise() {


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
      setPlayer(response.data);
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

  const columns = ["Name", "Address"];
const data= [];
  playerList.map((row,i) =>{
     data[i] = [row.name, row.address];
  });
  

  const options = {
    filterType: "checkbox",
  };
  return (
    <div>

      {/* <ExcelForm table="club"/> */}
      <h4>Club List</h4>

    </div>

  );
}