import react from 'react';
import BasicCard from './components/card';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ResponsiveAppBar from './AppBar';
import Fbl from './fblogin';
import Login from './components/glogin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InstaLogin from './components/instalogin';
import InstaFeeds from './components/InstaFeeds';
import Fblogin from './components/FBlogin';



export default function MediaData() {
    const p = {
        paddingTop: "2rem"
    }
    return (
        <>
            <div>
                <ResponsiveAppBar />
                <Grid container spacing={5} justifyContent="center">
                    <Grid item xs={11}>
                        <Box style={p}>
                            <Grid container spacing={5} justifyContent="center">
                                <Grid item xs={4}>
                                    <BasicCard />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={11}>
                        <Box style={p}>
                            <Grid container spacing={5} justifyContent="center">
                                <Grid item xs={4}>

                                    <Card sx={{ minWidth: 275, display: "flex", justifyContent: "center" }}>
                                        <CardContent>
                                            <Grid container justifyContent="center" spacing={5}>
                                                <Grid item >
                                                    <Login />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>

                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={11}>
                        <Box style={p}>
                            <Grid container spacing={5} justifyContent="center">
                                <Grid item xs={4}>

                                    <Card sx={{ minWidth: 275, display: "flex", justifyContent: "center" }}>
                                        <CardContent>
                                            <Grid container justifyContent="center" spacing={5}>
                                                <Grid item >
                                                   <InstaLogin />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={11}>
                    <Box style={p}>
                            <Grid container spacing={5} justifyContent="center">
                                <Grid item xs={4}>

                                    <Card sx={{ minWidth: 275, display: "flex", justifyContent: "center" }}>
                                        <CardContent>
                                            <Grid container justifyContent="center" spacing={5}>
                                                <Grid item >
                                                  <Fblogin />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}