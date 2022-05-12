import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import Slider from "@material-ui/core/Slider";
import { Button, Typography, Box, Grid } from '@material-ui/core';
import Logo from '../marker.png';
import Axios from 'axios';
import DataGrid from './datagrid';
import Chateng from './chat';
require('dotenv').config();

function valuetext(value) {
  return `${value}km`;
}


const MapPl = (props) => {

  const navigate = useNavigate();
  const c = Object.values(props.config.cords);
  const a = props.config.opt;
  const day = props.config.opt1;
  const time = props.config.opt2;
  const prof = props.config.opt3;
  const sptCenter = props.config.opt4;
  const [playerList, setPlayer] = useState([]);
  const [rel, setRel] = useState(0);

  useEffect(() => {
    Axios.post(`${process.env.REACT_APP_PORT}Player`, {
      spt:a,
      day:day
    }).then((response) => {
      console.log("Response data");
      console.log(response.data);
      setPlayer(response.data.rows);
    });
  }, []);


  const routeChange = (name, lat, lang) => {
    navigate('/profile', {state:{name, c, lat, lang}});
  }
  const googleMapRef = useRef(null);
  let googleMap = null;

  const [range, setRange] = useState(5);
  var z = 12;
  if (range > 6) {
    if (range > 15) {
      z = 10.8;
    } else {
      if (range > 9) {
        z = 11.2;
      } else {
        z = 11.8;
      }

    }
  }


  const spt = [
    {
      sports: ['Cricket', "Football", 'Basketball', 'Vollyball']
    },
    {
      sports: ["Football"]
    },
    {
      sports: ['Cricket', 'Vollyball']
    },
    {
      sports: ['Basketball', 'Vollyball']
    },
    {
      sports: ['Vollyball']
    },
    {
      sports: ['Cricket']
    },
    {
      sports: ['Cricket', 'Basketball', 'Vollyball']
    },
    {
      sports: ["Football", 'Basketball', 'Vollyball']
    }
  ]


  // list of icons
  const iconList = {
    icon1: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Flag--Right-Chartreuse.png',
    icon2: 'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png',
    icon3: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Right-Azure.png',
    icon4: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Pink.png',
    icon5: 'https://dryicons.com/free-icons/map-marker',

  }


  // list of the marker object along with icon








  // { lat: '23.303583', lng: '77.371029', data: spt[0].sports, info: "Aman" },
  // { lat: '23.313583', lng: '77.381029', data: spt[1].sports, info: "Ashish" },
  // { lat: '23.3153583', lng: '77.361029', data: spt[1].sports, info: "Utkarsh" },
  // { lat: '23.303583', lng: '77.351029', data: spt[2].sports, info: "AmanB" },
  // { lat: '23.3333583', lng: '77.36781029', data: spt[3].sports, info: "AshishB" },
  // { lat: '23.3533583', lng: '77.35781029', data: spt[3].sports, info: "GovindB" }


    const markerList = [
      { lat: c[0], lng: c[1], icon: iconList.icon1, info: sptCenter +"" }
    ]
    playerList.map((row,i)=>{
      let inf = "<h3>"+row.name+"</h3><h4>"+row.sport+"</h4>";

      markerList[i+1] = { lat: parseFloat(row.lat), lng:  parseFloat(row.lang), data: row.sport, data2:row.avail_day, time_f:row._from, time_t:row._to, data3:row.prof, data4:row.name, info: inf };

     });
  


  // useEffect(() => {
  //   googleMap = initGoogleMap();
  //   var bounds = new window.google.maps.LatLngBounds();
  //   markerList.map((x, index) => {
  //     if(index != 0){
  //       const marker = createMarker(x);
  //       //  Add event listner to the markers
  //       //  marker.addListener("click", () => {
  //       //  alert("marker clicked");
  //       //  routeChange
  //     }

  //     if(index == 0){
  //       const marker = createMarker(x);
  //       makeCircle(marker);
  //     }


  //     // bounds.extend(marker.position);
  //   });
  //   // googleMap.fitBounds(bounds); // the map to contain all markers
  // }, [range, rel]);


  // &&(x.time_f<=time&&x.time_t>=time)
  useEffect(() => {
    
    googleMap = initGoogleMap();
    var bounds = new window.google.maps.LatLngBounds();
    markerList.map((x, index) => {
      console.log("value of a in map "+ a);
   
      if (index != 0) {
      console.log("value of a in index "+ a);

        if (!(a == "")) {
      console.log("value of a in second if "+ a);

          console.log("marker Values" + x.data.search(a));

          if ((x.data.search(a) !== -1)&&(x.data2.search(day) !== -1)&&(x.time_f<=time&&x.time_t>=time)) {

            console.log("testing marker data " +x.info);
            const marker = createMarker(x);
    
            window.google.maps.event.addListener(marker, 'click', function () {
              
              routeChange(x.data4, x.lat, x.lng);
            });
          }

        } else {
          const marker = createMarker(x);
          //  Add event listner to the markers
          window.google.maps.event.addListener(marker, 'click', function () {
            routeChange(x.info, x.lat, x.lng);
          });
        }

      }

      if (index == 0) {
        const marker = createMarker(x);
        makeCircle(marker);
        window.google.maps.event.addListener(marker, 'click', function () {
          var q = x.info;
          window.open('http://google.com/search?q='+q);
        });

       
      }
      // bounds.extend(marker.position);
    });
    // googleMap.fitBounds(bounds); // the map to contain all markers
  }, [range, rel]);

  useEffect(
    () => {
      let timer1 = setTimeout(() => setRel(2), 1000);
      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true      
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    []
  );


  // 23.303583, 77.381029
  // initialize the google map
  const initGoogleMap = () => {
    const s = new window.google.maps.Size(42, 68);
    const myLatLng = new window.google.maps.LatLng(c[0], c[1]);
    return new window.google.maps.Map(googleMapRef.current, {
      center: myLatLng,
      zoom: z,
      size: s
    });

  }
  // create marker on google map
  // create marker on google map
  const createMarker = (markerObj) => {
    const marker = new window.google.maps.Marker({
      position: { lat: markerObj.lat, lng: markerObj.lng },
      map: googleMap,
      icon: {
        url: markerObj.icon,
        // set marker width and height
        scaledSize: new window.google.maps.Size(100, 100)
      },
      title: markerObj.title
    });

    const infowindow = new window.google.maps.InfoWindow({ content: markerObj.info });
    marker.addListener("mouseover", () => infowindow.open(googleMap, marker));
    marker.addListener("mouseout", () => infowindow.close(googleMap, marker));

    return marker;
  }

  const makeCircle = (marker) => {
    // Add circle overlay and bind to marker
    var circle = new window.google.maps.Circle({
      map: googleMap,
      radius: range * 1000,    // 10 miles in metres
      fillColor: '#a7bcc3',
      strokeColor: '#2c93b7', //#4c67ff
      strokeOpacity: 0.8,
      strokeWeight: 2,
      // fillColor: '#FF0000',
      fillOpacity: 0.30,
    });
    circle.bindTo('center', marker, 'position');
  }

  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 7,
      label: '7',
    },
    {
      value: 8,
      label: '8',
    },
    {
      value: 9,
      label: '9',
    },
    {
      value: 10,
      label: '10',
    },
    {
      value: 11,
      label: '11',
    },
    {
      value: 12,
      label: '12',
    },
    {
      value: 13,
      label: '13',
    },
    {
      value: 14,
      label: '14',
    },
    {
      value: 15,
      label: '15',
    },
    {
      value: 16,
      label: '16',
    },
    {
      value: 17,
      label: '17',
    },
    {
      value: 18,
      label: '18',
    },
    {
      value: 19,
      label: '19',
    },
    {
      value: 20,
      label: '20',
    },
  ];

  return <div>

                 

               
    <Box style={{marginTop:"1rem", marginBottom:"2rem"}}>
      <Button variant='contained' color="primary" onClick={(e) => {
        let ch = rel + 1;
        setRel(ch);
      }}>Re - Load map</Button>
    </Box>
    <Typography color="primary" variant='h6'>Range in Km</Typography>
    <Slider
      onChange={(event, value) => { setRange(value); }}
      aria-label="custom marks"
      defaultValue={5}
      getAriaValueText={valuetext}
      valueLabelDisplay="on"
      step={1}
      min={1}
      max={20}
      marks={marks}
    />
    <Typography variant="h6" style={{ marginTop: "2rem" }}>Available Players</Typography>
    <Grid container justifyContent='center' spacing={5} style={{ marginTop: "0.5rem" }}>
      <Grid item md={6}>
        <Grid container>
          
          <Grid item xs={12}>
          <DataGrid spt={a} day={day} time={time} cords={c} markerList={markerList} range={range} />
          </Grid>

          <Grid item xs={12}>
          <div style={{paddingTop:"1rem"}}>
            <Button variant="contained" onClick={()=>{}} >
            <h4>GO TO CHATS</h4>
            </Button>         
          </div>
          </Grid>
        </Grid>
        
      </Grid>
      <Grid item md={6} xs={12}>
        <div
          ref={googleMapRef}
          style={{ maxwidth: 600, height: 500 }}
        />
      </Grid>
     
    </Grid>
  </div>
}

export default MapPl;