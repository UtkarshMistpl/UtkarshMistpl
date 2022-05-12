import React from "react";
import { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { Input, InputLabel } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Box } from "@material-ui/core";
import ClubCityWise from "./clubcitywise";
import Axios from "axios";

require('dotenv').config();

export default function NewForm() {

    const defaultValues = {
        fname: "",
        lname: "",
        age: 0,
        gender: "",
        os: "",
        favoriteNumber: 0,
    };

    const [formValues, setFormValues] = useState(defaultValues);

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
        console.log(formValues);
    };

    const dflex = {
        display: "flex",
        justifyContent: "center"
    }
    console.log("in Form");

    useEffect(() => {
        Axios.post(`${process.env.REACT_APP_PORT}clubcitywise`, {

        }).then((response) => {
            console.log("City wise Data");
            console.log(response.data);
        })
    }, []);

    return (

        <div className="NewForm">
            <ClubCityWise />
        </div>
    );
}

