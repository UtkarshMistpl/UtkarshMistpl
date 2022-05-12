import React from "react";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import ResponsiveAppBar from './AppBar';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { Box, FormGroup, Typography } from "@material-ui/core";
import { Input, InputLabel, makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import './App.css';
import { Navigate } from "react-router";
import { useNavigate } from 'react-router-dom';

// Set a Cookie
function setCookie(cName, cValue, expDays){
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(1),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        maxWidth: '500px'
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

const m = {
    marginTop: "24px"
}
const fbox = {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem"
}
document.body.style = 'background:#e7ebf0 ;';



function ForgetPass() {
    const navigate = useNavigate();
    const [upass, setUserpass] = useState('');
    const [confpass, setConfpass] = useState('');
    const [uname, setUsername] = useState('');
    const [bool, setBool] = useState(0);
    const [otp, setOtp] = useState('');
    const [confotp, setConfotp] = useState('');
    const classes = useStyles();


    // Axios.defaults.withCredentials= true;
    // start of add function
    const add = () => {
        Axios.post("/otpVerify", {
            email: uname
        }).then((response) => {
            setOtp(response.data);
            alert(response.data);
            setBool(1);
        });
    };
    // end of add function
    // useEffect(()=>{
    //   Axios.get('http://localhost:3001/login').then((response)=>{
    //       if(response.data.logedIn){
    //         console.log(response.data.user[0].username);
    //       }

    //   })
    // });

    const verify = () =>{
        alert(otp +", "+confotp);
        if(otp == (confotp+"")){
            setBool(2);
        }else{
            alert(
                "error"
            );
        }
    }

    const passWordF = (bool) => {
        if (bool==0) {
            return <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={11}>
                    <Typography color="primary" variant="h5"> Reset Password </Typography>
                </Grid>

                <Grid item xs={11} >
                    <TextField
                        id="user_id"
                        name="username"
                        label="Email"
                        type="text"
                        variant="outlined"
                        value={uname}
                        onChange={(event) => { setUsername(event.target.value); console.log(uname); }}
                        style={{ height: 50 }}
                        fullWidth
                    />
                </Grid>

                {/* <Grid item xs={11}>
                    <TextField
                        id="user_id"
                        name="username"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={upass}
                        onChange={(event) => { setUserpass(event.target.value); console.log(upass) }}
                        style={{ height: 50 }}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={11}>
                    <TextField
                        id="user_id"
                        name="username"
                        label="Confirm password"
                        type="password"
                        variant="outlined"
                        value={confpass}
                        onChange={(event) => { setConfpass(event.target.value); console.log(confpass) }}
                        style={{ height: 50 }}
                        fullWidth
                    />
                </Grid> */}

                <Box className={classes.left} style={m}>
                    <Button className={classes.gap} variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Box>

            </Grid>
        } else{

         if(bool==1) {
            return <Grid container justifyContent="center">
                <Grid item xs={11}>
                <TextField
                        id="otp"
                        name="verify_otp"
                        label="Confirm password"
                        type="password"
                        variant="outlined"
                        value={confotp}
                        onChange={(event) => { setConfotp(event.target.value)}}
                        style={{ height: 50 }}
                        fullWidth
                    />
                </Grid>
                <Box className={classes.left} style={m}>
                    <Button className={classes.gap} onClick={verify} variant="contained" color="primary" type="button">
                        Submit
                    </Button>
                </Box>
            </Grid>
        }else if(bool==2){
            return <Grid container justifyContent="center" spacing={3}>
                  <Grid item xs={11}>
                    <TextField
                       
                        name="userpass"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={upass}
                        onChange={(event) => { setUserpass(event.target.value); console.log(upass) }}
                        style={{ height: 50 }}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={11}>
                    <TextField
                       
                        name="confirmpass"
                        label="Confirm password"
                        type="password"
                        variant="outlined"
                        value={confpass}
                        onChange={(event) => { setConfpass(event.target.value); console.log(confpass) }}
                        style={{ height: 50 }}
                        fullWidth
                    />
                </Grid>
                <Box className={classes.left} style={m}>
                    <Button className={classes.gap} variant="contained" color="primary" type="button" onClick={Setnewpass}>
                        Submit
                    </Button>
                </Box>
            </Grid>

        }
    }

    }

    const updatePass = () =>{
        Axios.post("/update_pass",{
            pass:upass,
            email:uname
        
        }).then((response)=>{
            alert("password updated");
        })
    }   
     const handleSubmit = (e) => {
        e.preventDefault();
            add();  
    }
    const Setnewpass = ()=>{
        if(upass==confpass){
            updatePass();
            navigate('/login');
        }else{
            alert("password did not match");
        }
    }
    return (
        <div className="Login" >
            <ResponsiveAppBar />

            <form onSubmit={handleSubmit} style={fbox}>
                <Paper variant="outlined" className={classes.pageContent}>
                    {passWordF(bool)}
                </Paper>
            </form>
        </div>
    );

}

export default ForgetPass;