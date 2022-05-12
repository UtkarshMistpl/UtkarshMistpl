import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Axios from 'axios';
import {useState, useEffect} from 'react';
function rand() {
    return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 550,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal(props) {
    const id = props.name;

    const [sport, setSport] = useState('');
    const [fname, setfName] = useState('');
    const [lname, setLName] = useState('');
    const [skills, setSkills] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [rate, setRate] = useState(0);
    const [range, setRange] = useState(1);
    const [prof, setProf] = useState('');
    const [address, setAddress] = React.useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [days, setDay] = useState('');
    const [userD, setUser] = useState({});
    
 
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const Edit = (v,field) => {
        Axios.post('/Edit', {
            id: id,
            name:fname,
            phone:phone,
            email:email,
            address:address,     
            sport:sport,
            skill:skills,
            charge:rate,
            range:range,
            prof:prof,
            from:from,
            to:to,
            days:days
        }).then((response) => { alert("Changed successfully") });
    }

    useEffect(()=>{
        Axios.post('http://localhost:3001/show_old', {
            id:id
        }).then((response)=>{
           console.log(response.data.rows[0]);
            setUser(response.data.rows[0]);
        })
    },[]);

    return (
        <div>
            <span style={{ color: "blue", cursor: 'pointer' }} onClick={handleOpen}>
                Edit
            </span>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <Grid container spacing={5}>
                        <Grid item xs={11} md={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="Name"
                                        label="Name"
                                        defaultValue={userD.name}
                                        variant="outlined"
                                        size="small"
                                        onChange={(event) => { setfName(event.target.value); }}
                                        fullWidth
                                    />
                                </Grid>
                            
                            </Grid>
                        </Grid>
                        <Grid item xs={11} md={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="Phone"
                                        label="Phone"
                                        defaultValue={userD.phone}
                                        variant="outlined"
                                        size= "small"
                                        onChange={(event)=>{setPhone(event.target.value)}}
                                    />
                                </Grid>
                               
                            </Grid>
                        </Grid>
                        <Grid item xs={11} md={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="Email"
                                        label="Email"
                                        defaultValue={userD.email}
                                        variant="outlined"
                                        size= "small"
                                        onChange={(event)=>{setEmail(event.target.value)}}
                                    />
                                </Grid>
                      
                            </Grid>
                        </Grid>
                        <Grid item xs={11} md={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="Address"
                                        label="Address"
                                        defaultValue={userD.Address}
                                        variant="outlined"
                                        size= "small"
                                        onChange={(event)=>{setAddress(event.target.value)}}
                                    />
                                </Grid>
                            
                            </Grid>
                        </Grid>
                        <Grid item xs={11} md={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="skill"
                                        label="Skill"
                                        variant="outlined"
                                        size= "small"
                                        defaultValue={userD.skill}
                                        onChange={(event)=>{setSkills(event.target.value)}}
                                    />
                                </Grid>
                        
                            </Grid>
                        </Grid>
                        <Grid item xs={11} md={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="Sport"
                                        label="Sport"
                                        variant="outlined"
                                        size= "small"
                                        defaultValue={userD.sport}
                                        onChange={(event)=>{setSport(event.target.value)}}
                                    />
                                </Grid>
                             
                            </Grid>
                        </Grid>
                        <Grid item xs={11} md={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                   
                                        placeholder="Days"
                                        label="Days"
                                        defaultValue={userD.avail_day}
                                        variant="outlined"
                                        size= "small"
                                        onChange={(event)=>{setDay(event.target.value)}}
                                    />
                                </Grid>
                            
                            </Grid>
                        </Grid>
                        <Grid item xs={11} md={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="Time"
                                        label="From"
                                        variant="outlined"
                                        defaultValue={userD._from}
                                        type="time"
                                        size= "small"
                                        onChange={(event)=>{setFrom(event.target.value)}}
                                    />
                                </Grid>
                              
                            </Grid>
                        </Grid>
                        <Grid item xs={11} md={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="Time"
                                        label="To"
                                        defaultValue={userD._to}
                                        variant="outlined"
                                        type="time"
                                        size= "small"
                                        onChange={(event)=>{setTo(event.target.value)}}
                                        
                                    />
                                </Grid>
                            
                            </Grid>
                        </Grid>
                        <Grid item xs={11} md={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="0"
                                        label="Range"
                                        variant="outlined"
                                        defaultValue={userD.rang}
                                        type = "number"
                                        size = "small"
                                        onChange={(event)=>{setRange(event.target.value)}}
                                    />
                                </Grid>
                                
                            </Grid>
                        </Grid>
                        <Grid item xs={11} md={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="Yes"
                                        label="Professional"
                                        variant="outlined"
                                        defaultValue={userD.prof}
                                        size= "small"
                                        onChange={(event)=>{setProf(event.target.value)}}
                                    />
                                </Grid>
                               
                            </Grid>
                        </Grid>
                        <Grid item xs={11} md={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                        placeholder="charge"
                                        label="Charge"
                                        variant="outlined"
                                        defaultValue={userD.charge}
                                        type= "number"
                                        size= "small"
                                        onChange={(event)=>{setRate(event.target.value)}}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button variant="contained" size="small" color="primary" onClick={()=>{Edit();}} style={{marginTop:"2rem"}} > UPDATE </Button>
                </div>
            </Modal>
        </div>
    );
}