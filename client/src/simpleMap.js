import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
const logo = require('./marker.png');

const GOOGLE_MAP_API_KEY = 'AIzaSyDNK21n1bQmy2k8SRdWfVIdxkjlkp_Slb4';

const markerStyle = {
  position: "absolute",
  PointerEvent:true
};

const Marker = ({ onMarkerClick }) => <div onMouseEnter={onMarkerClick} style={markerStyle}><img onClick={onMarkerClick} width={28}  src={logo} /></div>;

const markers = [{
  lat:59.935413,
  lang:30.337844,
  key:1,
  value:1
},{
  lat:59.925413,
  lang:30.337844,
  key:1,
  value:1
},{
  lat:59.955413,
  lang:30.337844,
  key:1,
  value:1
},
];

function handleMarkerClick(){
  console.log('marker clicked');
}

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  
  
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {markers.map((val,key)=>{
            return (
            <Marker
            lat={val.lat}
            lng={val.lang}
            text="My Marker"
            onClick={handleMarkerClick}
          />
            );
          })}
          
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;