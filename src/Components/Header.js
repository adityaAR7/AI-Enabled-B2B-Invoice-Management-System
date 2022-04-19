import React from 'react'
import { Grid, makeStyles, Button, ButtonGroup, AppBar, Toolbar, Typography, Box } from '@material-ui/core'
import { ReactComponent as HRCLogo } from "./HRC.svg";
import { ReactComponent as ABCLogo } from "./ABCLogoFull.svg"


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#2a3e4c",
        transform: 'translateZ(0)',

    },
    tp: {
        color: 'black'
    },
    gd:{
        margin:'auto'
    }
}))

export default function Header(props) {
    const classes = useStyles();
    return (
        <AppBar className={classes.root} position="static">
            <Toolbar>
                <Grid container>
                    <Grid item>
                        <ABCLogo/>
                    </Grid>
                    <Grid item className={classes.gd}>
                        <HRCLogo/>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
