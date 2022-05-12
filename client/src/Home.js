import React from "react";
import TextField from "@material-ui/core/TextField";
import ResponsiveAppBar from "./AppBar";

import { useState, useEffect } from "react";
import SimpleMap from "./simpleMap";
import Grid from "@material-ui/core/Grid";
import { Typography, Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import Axios from "axios";
import HomeMap from "./components/homeMap";
require('dotenv').config();
const m = {
    marginTop: "16px",
    marginBottom: "16px"
}



// load google map script



function Home({ navigation }) {

    const rol = useParams();
    const role = rol.var1;
    const [address, setAddress] = React.useState('');
    const [username, setUserN] = React.useState('');
    const [time, setTime] = React.useState('');
    const [day, setDay] = React.useState('');
    const [prof, setProf] = React.useState('No');
    const navigate = useNavigate();

    const center = {
        textAlign: "center"
    }


    const [loadMap, setLoadMap] = useState(true);
    const [radio, setRadio] = useState('');
    const [sportlist, setSport] = useState([]);

    // useEffect(() => {
    //     loadGoogleMapScript(() => {
    //         setLoadMap(true)
    //     });
    // }, []);

    useEffect(() => {
        Axios.post(`${process.env.REACT_APP_PORT}sportsdata`, {

        }).then((response) => {
            setSport(response.data.rows);
            console.log("Here is new data");
            console.log(response.data.rows);
        });
    }, []);

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latlang = await getLatLng(results[0]);
        console.log(latlang);
        // setCordinates(latlang);
        setAddress(value);
        handleClick();
    }

    const add = () => {

        Axios.post(`${process.env.REACT_APP_PORT}SportCenter`, {

            address: address
        }).then((response) => {

            console.log("Response data");
            console.log(response.data);
            if (true) {
                navigate('/PlayerData', { state: { address, radio, day, time, prof}, });
            } else {
                alert("This Sport Center is not Available");
            }
        });

    };

    const handleClick = () => {
        if (address != "" && (day != "")&&(radio !="")&&(time != "")) {
            add();

        } else {

            alert("No Sport Center Selected");
        }
    }

    // useEffect(()=>{
    //     Axios.get('http:localhost/login').then((response)=>{
    //         if(response){
    //           console.log(response.data);
    //           setUserN(response.data);
    //         }else{
    //             alert("not loged in");
    //         }

    //     })
    //   },[]);

    return (
        <div className="Home">
            <ResponsiveAppBar role={role} />
            <div style={m}>

            </div>
            <Grid container justifyContent="center" spacing={3} style={m}>
                <Grid item md={4}>
                    <FormControl style={m}>
                        <FormLabel id="demo-radio-buttons-group-label">Sports</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={radio}
                            name="radio-buttons-group"
                            onChange={(event) => {
                                setRadio(event.target.value);
                            }}
                        >
                            {sportlist.map((row) => (

                                <FormControlLabel value={row.sport} control={<Radio />} label={row.sport} />

                            ))}
                            {/* <FormControlLabel value="Cricket" control={<Radio />} label="Cricket" />
                                    <FormControlLabel value="Football" control={<Radio />} label="Football" />
                                    <FormControlLabel value="BasketBall" control={<Radio />} label="BasketBall" />
                                    <FormControlLabel value="Vollyball" control={<Radio />} label="Vollyball" /> */}
                        </RadioGroup>
                    </FormControl>

                    <FormControl style={m}>
                        <FormLabel id="demo-radio-buttons-group-label">Select a day</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={day}
                            name="radio-buttons-group"
                            onChange={(event) => {
                                setDay(event.target.value);
                            }}
                        >

                            <FormControlLabel value="Sunday" control={<Radio />} label="Sunday" />
                            <FormControlLabel value="Monday" control={<Radio />} label="Monday" />
                            <FormControlLabel value="Tuesday" control={<Radio />} label="Tuesday" />
                            <FormControlLabel value="Wednesday" control={<Radio />} label="Wednesday" />
                            <FormControlLabel value="Thursday" control={<Radio />} label="Thursday" />
                            <FormControlLabel value="Friday" control={<Radio />} label="Friday" />
                            <FormControlLabel value="Satarday" control={<Radio />} label="Satarday" />

                        </RadioGroup>
                    </FormControl>
                    <Typography style={{ color: "grey" }}>Time</Typography>
                    <TextField variant="outlined" type='time' onChange={(e) => {
                        setTime(e.target.value);
                    }} />
                    
                    <Box style={{ marginTop: '2rem' }}> </Box>
                </Grid>
                <Grid item md={6} xs={11}>
                    
                    <Grid item md={10} xs={11}>

                        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (<div>

                                <TextField
                                    id="address-input"
                                    name="address"
                                    label="Sport/Center"
                                    variant="outlined"
                                    type="text"
                                    value={address}
                                    {...getInputProps({
                                        placeholder: ' ...',
                                        className: 'location-search-input',
                                    })}
                                    style={{marginBottom:"2rem"}}
                                    fullWidth
                                />
                                <div>
                                    {loading ? <div>...loading</div> : null}
                                    {suggestions.map((suggestion) => {
                                        const style = {
                                            // #3c3e42
                                            backgroundColor: suggestion.active ? "#2e3138" : "#fff",
                                            color: suggestion.active ? "#ced4da" : "#000000"
                                        };
                                        return (<div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>);
                                    })}
                                </div>


                            </div>

                            )
                            }
                        </PlacesAutocomplete>
                    </Grid>

                    <Grid item xs={11} md={10}>
                       <HomeMap />
                    </Grid>
                    </Grid>
            </Grid>
        </div>
    );
}

export default Home;