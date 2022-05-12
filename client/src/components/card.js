import React, { useEffect, useRef, useState, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fbl from '../fblogin';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


export default function BasicCard() {


    return (
        <Card sx={{ minWidth: 275, display: "flex", justifyContent: "center" }}>
            <CardContent>
                <Grid container justifyContent="center" spacing={5}>
                    <Grid item >
                        <Fbl />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}