import { AppBar, Link, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme=>({
  root: {
      backgroundColor: "#2a3e4c",
      transform:'translateZ(0)',
      height:"70px"

      
  },
  tp:{
    width: "100%",
    textAlign: "center",
    color:"#fff"
}

}))
const year = new Date().getFullYear();

export default function Footer() {
  const classes = useStyles();
  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Typography variant='h6' component="div" className={classes.tp}>
        <Link href="#">
         Privacy Terms
        </Link>
          |&copy; <span id="curreny_year">{year}</span> Copyright Highradius Corporation. All rights reserved.
        </Typography>
      </Toolbar>

    </AppBar>
  )
}
