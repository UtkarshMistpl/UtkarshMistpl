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
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';

import Paper from "@material-ui/core/Paper";
import ChKBox from "./components/ChKBox";
import './App.css';




const defaultValues = {
    fname: "",
    lname: "",
    age: 0,
    gender: "",
    sports: "",
    skill: "",
    days: [],
    rate: 0,
    prof: '',
    address: '',
    time: '',
    range: 0,
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const options = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Satarday'];
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
        justifyContent: 'start',
        width: '100%',

    },
    gap: {
        marginLeft: theme.spacing(5)
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

function ClubForm() {

    const [formValues, setFormValues] = useState(defaultValues);
    const [name, setName]= useState('');
    const [sport, setSport] = useState();
    const [address, setAddress] = React.useState('');

    const [chk, setChk] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const [phone , setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [ charge, setCharge] = useState('');

    const [checked, setChecked] = React.useState(days);
    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latlang = await getLatLng(results[0]);
        console.log(latlang);
        // setCordinates(latlang);
        setAddress(value);
    }

    // start of add function
    const add = () => {
        if (true) {

            Axios.post("http://localhost:3001/ClubRegistration", {
                name: name,
                sport: sport,
                address: address,
                chk: chk,
                from: from,
                to: to,
                phone: phone,
                email: email,
                charge: charge

            }).then(() => {
                alert("success");
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
        console.log(name);
        console.log(sport);
        console.log(email);
        console.log(phone);
        console.log(address);
        console.log(chk);
        console.log(from);
        console.log(to);
        console.log(charge);

        add();

    };



    const fbox = {
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem"
    }

    const classes = useStyles();

    document.body.style = 'background:#e7ebf0 ;';

    const sports = ['Cricket', 'Football', 'Basketball', 'Vollyball'];
    const skill = ['Batsman', 'Balling', 'Wicket Keeping'];

    return (
        <div className="PlayerForm">
            <ResponsiveAppBar />

            <form onSubmit={handleSubmit} style={fbox}>
                <Paper variant="outlined" className={classes.pageContent}>
                    <Grid container justifyContent="center" spacing={3} className="fonts" >

                        <Grid item xs={11}>
                            <TextField
                                id="Club-input"
                                name="club-name"
                                label="Club/Sport Center Name"
                                type="text"
                                value={name}
                                onChange={(event) => { setName(event.target.value); }}
                                style={{ height: 50 }}
                                fullWidth
                            />
                        </Grid>

                        {/* <Grid item xs={6}>
                            <TextField
                                id="lname-input"
                                name="lname"
                                label="Last Name"
                                type="text"
                                value={formValues.lname}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid> */}

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

                        {/* <Grid item xs={11}>
                            <FormControl fullWidth >
                                <InputLabel id="test-select-label">Skills</InputLabel>
                                <Select
                                    name="skill"
                                    value={formValues.os}
                                    onChange={handleInputChange}
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
                        </Grid> */}

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
                                        value={formValues.email}
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
                            <Typography style={{ color: "grey" }}>Open At</Typography>
                            {/* <label >Choose Day's</label> */}
                            <Autocomplete
                                onChange={(event, value) => {
                                    console.log(value);
                                    setChk(value)
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
                                        label="Day"
                                        placeholder="Choose" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography style={{ color: 'grey' }}>Opening/Closing Time
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            From
                            <TextField
                                id="to-input"
                                name="to"

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

                                type="time"

                                onChange={(event) => { setTo(event.target.value); }}
                                fullWidth
                            />
                        </Grid>
                        {/* <Grid item xs={11}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Are You A Proffesional</FormLabel>
                                <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                                    <FormControlLabel value="female" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="male" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid> */}
                        <Grid item xs={11}>
                            <TextField
                                id="Rate-input"
                                name="rate"
                                label="Membership Fee"
                                type="number"
                                onChange={(event) => { setCharge(event.target.value); }}

                                fullWidth
                            />
                        </Grid>

                        {/* <Grid item xs={11}>
                            <div fullWidth>
                                Range in Km
                                <Slider
                                    value={formValues.favoriteNumber}
                                    onChange={handleSliderChange("favoriteNumber")}
                                    defaultValue={1}
                                    step={1}
                                    min={1}
                                    max={5}
                                    marks={[
                                        {
                                            value: 1,
                                            label: "1",
                                        },
                                        {
                                            value: 2,
                                            label: "2",
                                        },
                                        {
                                            value: 3,
                                            label: "3",
                                        },
                                        {
                                            value: 4,
                                            label: "4",
                                        }, {
                                            value: 5,
                                            label: "5",
                                        },
                                    ]}
                                    valueLabelDisplay="off"
                                />
                            </div>
                        </Grid> */}

                        <Grid itme xs={12}></Grid>

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

export default ClubForm;