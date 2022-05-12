import React from "react";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import ResponsiveAppBar from './AppBar';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { Box, FormGroup, Typography } from "@material-ui/core";
import { Input, InputLabel, makeStyles } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useNavigate } from "react-router";
import axios from 'axios';
import { useParams, useLocation } from "react-router";
import Login from './components/glogin';

import ChKBox from './components/ChKBox';

import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';

import Paper from "@material-ui/core/Paper";
import './App.css';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const defaultValues = {
    fname: "",
    lname: "",
    age: 0,
    gender: "",
    skill: "",
    phone: "",
    email: "",
    rate: 0,
    prof: '',
    range: 0,
};

const length = {
    width: "500px"
}

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(1),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        maxWidth: '600px'
    },
    left: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',

    },
    gap: {
        marginLeft: theme.spacing(0)
    }
}));

const days = {
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    thursday: 'Thursday',
    friday: 'Friday',
    satarday: 'satarday'
}


function PlayerForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state.data;

    console.log("from mediadata ");
    console.log(data);

    const options = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Satarday'];

    const [formValues, setFormValues] = useState(defaultValues);
    const [checked, setChecked] = React.useState(days);

    const [sport, setSport] = useState([]);
    const [fname, setfName] = useState('');
    const [lname, setLName] = useState('');
    const [skills, setSkills] = useState([]);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [rate, setRate] = useState(0);
    const [range, setRange] = useState(1);
    const [prof, setProf] = useState('No');
    const [address, setAddress] = React.useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [chk, setChk] = useState([]);
    const [lat, setLat] = useState();
    const [lang, setLang] = useState();
    const [selectedFile, setSelectedFile] = React.useState(null);


    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latlang = await getLatLng(results[0]);
        console.log(latlang);
        setLat(latlang.lat);
        setLang(latlang.lng);
        // setCordinates(latlang);
        setAddress(value);
    }

    //show logut for google
    const showGlogout = () => {
        if (location.state.cmp == "google") {
            return (<Box style={{ position: "absolute", top: "16%", right: "4%" }} >
                <Login />
            </Box>);
        } else {
            if(location.state.cmp == "FB"){
            return (
                <Box style={{ position: "absolute", top: "16%", right: "4%" }} >
                    <div  style={{padding:"0.7rem 2rem", fontSize:"1.3rem", color:"#ffffff", background:"#3f51b5"}} class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="true" data-use-continue-as="false" onClick={()=>{navigate("/mediadata");}}>logout</div>
                </Box>

            );
            }else{
                return null;
            }
        }
    }
    //function to show input
    const showInput = () => {
        if (prof == 'No') {
            return null;
        } else {
            return (
                <Grid item xs={11}>
                    <TextField
                        id="Rate-input"
                        name="email"
                        label="Hourly Rate"
                        type="number"
                        onChange={(event) => { setRate(event.target.value); }}
                        fullWidth
                    />
                </Grid>
            );

        }
    }

    // start of add function
    const add = () => {
        if (true) {

            Axios.post("http://localhost:3001/PlayerForm", {
                fname: fname,
                lname: lname,
                sport: sport,
                skills: skills,

                phone: phone,
                email: email,
                address: address,

                chk: chk,
                from: from,
                to: to,
                prof: prof,
                rate: rate,
                lat:lat,
                lang:lang,
                range: range,


            }).then(() => {
                alert("success");
                navigate('/login');
            });
        } else {
            alert("Please fill all the fields");
        }
    };
    // end of add function


    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    const handleSliderChange = (name) => (e, value) => {
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        add();

    };

    const handleImage = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:3001/uploadimage",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            }).then((response) => {

                alert("success");
                window.location.reload();

            });

        } catch (error) {
            console.log(error)
        }
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const fbox = {
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem"
    }

    const classes = useStyles();

    document.body.style = 'background:#e7ebf0 ;';

    // const theme = createMuiTheme({
    //     props: {
    //       MuiPaper: {
    //         elevation: 10,
    //         square: true
    //       }
    //     }
    //   });

    function valuetext(value) {
        return `${value}°C`;
    }

    const sports = ['Cricket', 'Football', 'Basketball', 'Vollyball'];
    const skill = ['Bating', 'Balling', 'Wicket Keeping'];

    return (
        <div className="PlayerForm">

            <ResponsiveAppBar />
            {showGlogout()}

            <form onSubmit={handleSubmit} style={fbox}>
                <Paper variant="outlined" className={classes.pageContent}>
                    <Grid container justifyContent="center" spacing={3} className="fonts" >

                        <Grid item xs={5}>
                            <TextField
                                id="fname-input"
                                name="fname"
                                label="First Name"
                                type="text"
                                value={fname}
                                onChange={(event) => { setfName(event.target.value); }}
                                style={{ height: 50 }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                id="lname-input"
                                name="lname"
                                label="Last Name"
                                type="text"
                                value={lname}
                                onChange={(event) => { setLName(event.target.value); }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={11}>
                            <Autocomplete
                                onChange={(event, value) => {
                                    console.log(value);
                                    setSport(value);
                                }}
                                multiple
                                id="checkboxes-tags-demo"
                                options={sports}
                                renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option}
                                    </React.Fragment>
                                )}

                                renderInput={(params) => (
                                    <TextField {...params}
                                        label="Sports"
                                        placeholder="Choose" />
                                )}
                            />
                        </Grid>

                        <Grid item xs={11}>
                            <FormControl fullWidth >
                                <InputLabel id="test-select-label">Skills</InputLabel>
                                <Select
                                    name="skill"
                                    value={skills}
                                    onChange={(event) => { setSkills(event.target.value); }}
                                    labelId="test-select-label"
                                    label="Label"

                                >
                                    {skill.map((val, key) => {
                                        return (<MenuItem key={key} value={val}>
                                            {val}
                                        </MenuItem>)
                                    })}


                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                id="phone-input"
                                name="phone"
                                label="Phone"
                                type="text"
                                value={phone}
                                onChange={(event) => { setPhone(event.target.value); }}

                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={5}>
                            <TextField
                                id="email-input"
                                name="email"
                                label="Email"
                                type="text"
                                value={email}
                                onChange={(event) => { setEmail(event.target.value); }}

                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={11}>

                            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (<div>

                                    <TextField
                                        id="address-input"
                                        name="address"
                                        label="Address"
                                        type="text"
                                        value={address}
                                        {...getInputProps({
                                            placeholder: 'Enter Address ...',
                                            className: 'location-search-input',
                                        })}

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

                        <Grid item xs={11}>
                            <Typography style={{ color: "grey" }}>Choose Day's When You are Available</Typography>
                            <Autocomplete
                                onChange={(event, value) => {
                                    console.log(value);
                                    setChk(value);
                                }}
                                multiple
                                id="checkboxes-tags-demo"
                                options={options}
                                renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option}
                                    </React.Fragment>
                                )}

                                renderInput={(params) => (
                                    <TextField {...params}
                                        label=""
                                        placeholder="Choose" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography style={{ color: 'grey' }}>Time at which you are available
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            From
                            <TextField
                                id="to-input"
                                name="to"
                                value={from}
                                type="time"
                                onChange={(event) => { setFrom(event.target.value); }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={6}>
                            To
                            <TextField
                                id="from-input"
                                name="from"
                                value={to}
                                type="time"
                                onChange={(event) => { setTo(event.target.value); }}

                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Are You A Proffesional</FormLabel>
                                <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={prof} onChange={(event) => { setProf(event.target.value); }} >
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        {showInput()}


                        <Grid item xs={11} style={{ marginTop: '1rem' }}>
                            <div fullWidth>
                                Range in Km
                                <Slider
                                    onChange={(event, value) => { setRange(value); }}
                                    aria-label="Range"
                                    defaultValue={30}
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="on"
                                    step={10}
                                    marks
                                    min={10}
                                    max={110}
                                />
                            </div>
                        </Grid>
                        {/* <Grid item xs={11}>
                            <Typography>Upload Photo</Typography>
                            <TextField
                                id="email-input"
                                name="file"
                                variant="outlined"
                                type="file"
                                value={selectedFile}
                                onChange={handleFileSelect}
                                fullWidth
                            />
                        </Grid> */}

                        <Grid item xs={12}></Grid>

                        <Box className={classes.left}>
                            <Button className={classes.gap} variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </Box>

                    </Grid>
                </Paper>
            </form>

        </div>
    );
}

export default PlayerForm;