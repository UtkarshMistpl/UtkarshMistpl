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
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router';
import getDistance from 'geolib/es/getDistance';



export default function DataGrid(props) {


  const [playerList, setPlayer] = useState([]);
  const spt = props.spt;
  const day = props.day;
  const time = props.time;
  const c = props.cords;
  const range = props.range;
  const markerList = props.markerList;
  var i=0;
  const navigate = useNavigate();
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
    console.log("in table "+ spt);
    Axios.post(`${process.env.REACT_APP_PORT}player`, {

       spt:spt,
       day:day
    }).then((response) => {
      setPlayer(response.data.rows);
      console.log(playerList);
    });

  }, []);

  const routeChange = (name, lat, lang)=>{
    navigate('/profile', {state:{name, c, lat, lang}});
  }

  function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  return (
    <div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Sports</TableCell>
              <TableCell>Contact </TableCell>
              {/* <TableCell>Contact</TableCell>
              <TableCell>Professional</TableCell>
              <TableCell >Charge</TableCell>
              <TableCell >Available From</TableCell>
              <TableCell >Available To</TableCell>
              <TableCell >Day's at which available</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            { playerList.map((row) => {
            //  let dist =  getDistance(
            //     { latitude: c[0], longitude: c[1] },
            //     { latitude: row.lat, longitude: row.lang }
            // );
            if(true){
               i=i+1;
              if((row._from<=time&&row._to>=time)){
                
                  let dis = distance(c[0], c[1], row.lat, row.lang);
                  console.log(dis + "distance");
                  let tel = "tel://" + row.phone;
                  let watsp= '"intent://send/"'+row.phone+'"#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end"'
                  if(dis<range){
                return (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }} 
                  >
                    <TableCell component="th" scope="row" onClick={()=>{routeChange(row.name, row.lat, row.lang)}}>   
                      <a href="">{row.name}</a>
                    </TableCell>
                    <TableCell onClick={changeText} style={textcontainer}>{row.Address}</TableCell>
                    <TableCell>{row.sport}</TableCell>
                    <TableCell>  <a href={tel}>Call</a> &nbsp; &nbsp; &nbsp;
                    <a href={watsp}>Whatsapp</a></TableCell>
                    {/* <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.prof}</TableCell>
                    <TableCell>{row.charge}</TableCell>
                    <TableCell>{row._from}</TableCell>
                    <TableCell>{row._to}</TableCell>
                    <TableCell>{row.avail_day}</TableCell> */}
                    
                  </TableRow>
                )
              }
            }
          }
            } 
            )}
          </TableBody>
        </Table>

      </TableContainer>
     
    </div>

  );
}