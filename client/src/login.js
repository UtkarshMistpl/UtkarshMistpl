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
import { Link, link } from "react-router-dom";
import styled from "styled-components";


// const StyledLink = styled(Link)`
//   color: inherit;
//   text-decoration: none;
//   margin: 1rem;
//   position: relative;
// `;

// Set a Cookie
function setCookie(cName, cValue, expDays) {
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
    flexDirection:"column",
    justifyContent: "center",
    alignItems:"center",
    marginTop: "2rem"
}
document.body.style = 'background:#e7ebf0 ;';



function Login() {
    const navigate = useNavigate();
    const [upass, setUserpass] = useState('');
    const [uname, setUsername] = useState('');
    const classes = useStyles();


    Axios.defaults.withCredentials= true;
    // start of add function
    const add = () => {
        if (true) {

            Axios.post("http://localhost:3001/login", {
                uname: uname,
                upass: upass

            }).then((response) => {
                
                if (response.data.length == 0) {
                    alert("No User Found");
                } else { 
                    if(response.data.rows[0].role==="user")
                   navigate('/Home');
                   else
                   navigate('/Admin', { state :true});
                }
            });
        } else {
            alert("Please fill all the fields");
        }
    };
    // end of add function
    useEffect(()=>{
      Axios.get('http://localhost:3001/login').then((response)=>{
          if(response){
            console.log(response);
          }else{
              alert("not loged in");
          }
            
      })
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        add();
    }
    return (
        <div className="Login" >
            <ResponsiveAppBar />

            <form onSubmit={handleSubmit} style={fbox}>
                <Paper variant="outlined" className={classes.pageContent}>

                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item xs={11}>
                            <Typography color="primary" variant="h5"> Sign In</Typography>
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
                        <Grid item xs={11}>
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
                        <Box className={classes.left} style={m}>
                            <Button className={classes.gap} variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </Paper>
                <Typography >Forget password ? <Link to="/forgetpass">click here</Link></Typography>

                {/* <Link>click here</StyledLink> */}
            </form>

        </div>
    );

}

export default Login;