import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router";
import { Card } from '@material-ui/core';
import ResponsiveAppBar from './AppBar';
// import  "./images";
import { Grid } from '@material-ui/core';
import ListDividers from './components/Table';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
import { useNavigate } from 'react-router';
import Chateng from './components/chat';
require('dotenv').config();

const color = blue[500];

const uHistory = {
  minWidth:"10vw",
  height:"35vh",
  backgroundColor:"white",
  marginTop:"3rem"

}
export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state.name;
  const cords = location.state.c;
  const lat = location.state.lat;
  const lang = location.state.lang;
  const [value, setValue] = useState(false);
  console.log(lat+" / "+lang);
  const flbox = {
    display: "flex",
    justifyContent: "center",
    margin:"2rem"
  }
  const [playerList, setPlayer] = useState([]);

  useEffect(() => {
    Axios.post(`${process.env.REACT_APP_PORT}profile`, {

    }).then((response) => {
      setPlayer(response.data);
      console.log(playerList);
    });

  }, []);

  function chatbox(){
    if(value){
      return(
<div style={flbox}>
              <Chateng name={name}/>
            </div>
      );
    }
  }

  return (
    <div>
      <ResponsiveAppBar />

      <Grid container justifyContent='center' spacing={3} style={{ marginTop: "2rem" }}>
        <Grid item xs={11} md={5}>

          <div style={flbox}>
            <img src={require('./images/pngwing.png')} width="200px" />
          </div>
          <div style={flbox}>
          <Button color="primary" variant="outlined" onClick={()=>{
            // navigate("/userChat",{state:{name}});
            setValue(true);
          }}>Chat</Button>
            </div>

            
            
          {chatbox()}

        </Grid>
        <Grid item xs={11} md={7}>
          <div style={flbox}>
            <ListDividers name={name} cords={cords} lat={lat} lang={lang} />
          </div>
        </Grid>
      </Grid>
    </div>

  );
}