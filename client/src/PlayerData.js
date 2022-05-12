import React, { Profiler } from "react";
import MapPl from "./components/MapPlayer";
import ResponsiveAppBar from "./AppBar";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { FormControl, InputLabel, Select, Typography, Grid, MenuItem } from "@material-ui/core";
import ChKBox from "./components/ChKBox";
import Axios from "axios";
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import DataGrid from "./components/datagrid";

const GOOGLE_MAP_API_KEY = 'AIzaSyDNK21n1bQmy2k8SRdWfVIdxkjlkp_Slb4';

// load google map script
const loadGoogleMapScript = (callback) => {
    if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
        callback();
    } else {
        const googleMapScript = document.createElement("script");
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener("load", callback);
    }
}

const m = {
    marginTop: "24px",
    marginBottom: "16px"
}

function PlayerData({route, navigation}) {
 
    // const lct = addr.var2;
    
    // const rd = addr.var3;
    // alert(var2);
    const location = useLocation();
    console.log(location.state.address);
    const lct = location.state.address;
    const sp_data = location.state.radio;
    const day = location.state.day;
    const time = location.state.time;
    const prof = location.state.prof;
    const center = location.state.address;
    const [lalan, setlalan] = useState({});

    const getcord = async (value) => {
        const results = await geocodeByAddress(value);
        const latlang = await getLatLng(results[0]);
        setlalan(latlang);
        console.log(latlang);
        return latlang;

    }
    const [loadMap, setLoadMap] = useState(false);
    const options = ['Cricket', 'Football', 'Basketball'];
    const [skills, setSkills] = useState("");

    const config = {
        cords:lalan,
        opt:skills
    }

    useEffect(() => {
        getcord(lct);
        loadGoogleMapScript(() => {
            setLoadMap(true)
        });
    }, []);
    return (
        <div className="PlayerData">
            <ResponsiveAppBar />
            <div style={m}>
            </div>
            <Grid container spacing={3} justifyContent="center">
                {/* <Grid item md={8} xs={11}>
                    <FormControl fullWidth >
                        <InputLabel id="test-select-label">Skills</InputLabel>
                        <Select
                            name="skill"
                            value={skills}
                            onChange={(event) => { setSkills(event.target.value); }}
                            labelId="test-select-label"
                            label="Label"

                        >
                            {options.map((val, key) => {
                                return (<MenuItem key={key} value={val}>
                                    {val}
                                </MenuItem>)
                            })}


                        </Select>
                    </FormControl>
                </Grid> */}
                <Grid item xs={11}>
                <Typography variant="h5">{center}</Typography>

                </Grid>
                
                
                <Grid item xs={11}>
                    {!loadMap ? <div>Loading...</div> : <MapPl config={{cords:lalan,opt:sp_data, opt1:day, opt2:time, opt3:prof, opt4:lct}} />}
                </Grid>

            </Grid>
        </div>
    );
}

export default PlayerData;