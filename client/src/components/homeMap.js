import React, { useEffect, useRef, useState, useCallback } from 'react';
import Axios from 'axios';
require('dotenv').config();

export default function HomeMap(){
    const [playerList, setPlayer] = useState([]);
    const [rel, setRel] = useState(0);
    const googleMapRef = useRef(null);
    let googleMap = null;


    useEffect(() => {
        Axios.post(`${process.env.REACT_APP_PORT}Sports_Center`, {
          name:"name"
        }).then((response) => {
          console.log("Response data");
          console.log(response.data);
          setPlayer(response.data.rows);
        });
      }, []);


let markerList = [];
const z = 12;

  playerList.map((row,i)=>{
    // let inf = "<h3>"+row.name+"</h3><h4>"+row.sport+"</h4>";

    markerList[i] = { lat:parseFloat(row.lat), lng: parseFloat(row.lang), info: row.name };

   });
      
  useEffect(() => {
    googleMap = initGoogleMap();
    var bounds = new window.google.maps.LatLngBounds();
    markerList.map((x, index) => {
    
          const marker = createMarker(x);
          //  Add event listner to the markers
          window.google.maps.event.addListener(marker, 'click', function () {
            // routeChange(x.info, x.lat, x.lng);
            alert("Marker Clicked");
          });

      // bounds.extend(marker.position);
    });
    // googleMap.fitBounds(bounds); // the map to contain all markers
  }, [rel]);

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
    const myLatLng = new window.google.maps.LatLng(23.301972, 77.34068);
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
      return (
          <>
          <div
          ref={googleMapRef}
          style={{ maxwidth: 600, height: 500 }}
        />

          
          </>
      );
}