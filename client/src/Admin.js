import react from 'react';
import ResponsiveAppBar from './AppBar';
import { Button, Grid, Paper, Box } from "@material-ui/core";
import DataGridP from './components/playertable';
import DataGridC from './components/clubtable';
import { useEffect, useState } from 'react';
import { padding } from '@mui/system';
import { Navigate, useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './App.css';
import ExcelForm from './components/excel_form';


// import Sidemenu from './components/sidemenu';


function Admin({ route, navigation }) {

    const [bl, setBl] = useState(0);
    const [user, setUserN] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const [clc, setClc] = useState("");
    const [clp, setClp] = useState("");
    const admin = location.state;
    const [dnone, setDnone] = useState(1);
    const [dnonep, setDpnone] = useState(1);
    const st = {
        padding: "2rem"
    }
    // const mt = {
    //     height:"100vh"
    // }
    function dTable(b) {
        if (b == 0) {
            return <DataGridC />
        } else {
            if (b == 1) {
                return <DataGridP />
            } else {
                if (b == 2)
                    return <ExcelForm table="player" />;
                else
                    return <ExcelForm table="club" />;
            }
        }
    }
    function BoolC() {
        setBl(1);
    }
    function BoolP() {
        setBl(0);
    }
    function Boolpf() {
        setBl(2);
    }
    function Boolcf() {
        setBl(3);
    }
    const showC = (d) => {
        setClc("");
        setClp("");
        setDnone(d+1);
    }
    const showP = (d) => {
        setClp("");
        setClc("");
        setDpnone(d+1);

    }

    useEffect(() => {
        Axios.get('http//localhost:3001/login').then((response) => {
            if (response) {
                console.log(response.data);
                setUserN(response.data.rows);
                if (admin) {

                } else {
                    navigate('/login');
                    //    console.log(user.logedIn);
                }
            } else {
                alert("not loged in");
            }

        })
    }, []);

    function clubUl(d) {
        if (d%2==0) {
            return (
                <ul style={{ listStyle: "none", margin: "0rem" }}>
                    <li onClick={Boolcf} style={{ cursor: "pointer" }} >Add Clubs</li>
                    <li onClick={BoolC} style={{ cursor: "pointer" }}>Club List</li>
                </ul>
            );
        } else return null;
    }
    function playerUl(d) {
        if (d%2==0) {
            return (
                <ul id="tbplayer" style={{ listStyle: "none", margin: "0rem" }}>
                    <li onClick={BoolP} style={{ cursor: "pointer" }}>Player List</li>
                    <li onClick={Boolpf} style={{ cursor: "pointer" }} >Add Player</li>
                </ul>
            );
        } else return null;
    }

    return <div className='Admin'>
        <ResponsiveAppBar />
        {/* <Sidemenu /> */}
        <Grid container>
            <Grid item md={2} xs={12}>
                <Paper style={{height:"100%"}}>
                    <Box sx={{ height: { sm: 'auto', md: "100vh" } }}>
                        <Grid container justifyContent='center'>
                            <Grid item md={7} xs={6} >
                                <Button onClick={()=>{showC(dnone)}} style={{ fontWeight: "700", color:clc }}>Club</Button>
                                {clubUl(dnone)}
                            </Grid>
                            <Grid item md={7} xs={6}>
                                <Button onClick={()=>{showP(dnonep)}} style={{ fontWeight: "700", color:clp }}>Player</Button>
                                {playerUl(dnonep)}

                            </Grid>
                            {/* <Grid item md={7} xs={4}>
                                <Button onClick={BoolF} style={{ fontWeight: "700" }}>Upload</Button>
                            </Grid> */}
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
            <Grid item md={10} xs={12}>
                <div style={st}>
                    {dTable(bl)}
                </div>

            </Grid>
        </Grid>
    </div>
}

export default Admin;