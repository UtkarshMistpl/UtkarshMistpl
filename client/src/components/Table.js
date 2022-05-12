
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import {Button} from '@material-ui/core';
import Axios from "axios";
import getDistance from 'geolib/es/getDistance';

const style = {
  width: '100%',
  maxWidth: 400,
  bgcolor: 'background.paper',
};


export default function ListDividers(props) {

  const name = props.name;
  const cords = props.cords;
  const lat = props.lat;
  const lang = props.lang;
  console.log(lat+" / "+lang);
  console.log("cordinates in table");
  console.log(cords);

  const [userD, setData] = React.useState({});
  React.useEffect(() => {

    Axios.post("/profile", {
      name: name
    }).then((response) => {
      setData(response.data.rows[0]);
      console.log(response.data.rows[0]);
    })
  }, [])

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem divider>
        <ListItem button>
          <ListItemText primary="Name" style={{color:"blue"}} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={userD.name} />
        </ListItem>
      </ListItem>
      <Divider />
      <ListItem divider>
        <ListItem button>
          <ListItemText primary="Contact" style={{color:"blue"}} />
        </ListItem>
        <ListItem button>
         <a href='tel://+1234567890'>Call</a> &nbsp; &nbsp; &nbsp;
        <a href='"intent://send/8516924735#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end"'>Whatsapp</a>
        </ListItem>
      </ListItem>
      <ListItem divider>
        <ListItem button>
          <ListItemText primary="Address" style={{color:"blue"}} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={userD.Address} />
        </ListItem>
      </ListItem>
      <ListItem divider>
        <ListItem button>
          <ListItemText primary="Sports" style={{color:"blue"}} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={userD.sport} />
        </ListItem>
      </ListItem>
      <Divider light />
      <ListItem divider>
        <ListItem button>
          <ListItemText primary="Day's" style={{color:"blue"}} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={userD.avail_day} />
        </ListItem>
      </ListItem>
      <ListItem divider>
        <ListItem button>
          <ListItemText primary="Time" style={{color:"blue"}} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={userD._from} />
          <ListItemText primary='To' />
          <ListItemText primary={userD._to} />
        </ListItem>
      </ListItem>
      <ListItem divider>
        <ListItem button>
          <ListItemText primary="Professional" style={{color:"blue"}} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={userD.prof} />
        </ListItem>
      </ListItem>
      <ListItem divider>
        <ListItem button>
          <ListItemText primary="Rate" style={{color:"blue"}} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={userD.charge} />
        </ListItem>
      </ListItem>
      <ListItem divider>
        <ListItem button>
          <ListItemText primary="Distance" style={{color:"blue"}} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={getDistance(
    { latitude: cords[0], longitude: cords[1] },
    { latitude: lat, longitude: lang }
) + " meters"} />
        </ListItem>
      </ListItem>
    </List>

  );
}