import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Button } from './Button'

const useStyles=makeStyles(theme=>({
    root:{
        minWidth:0,
        margin:theme.spacing(0.5)
    },
    secondary:{
        backgroundColor:"#0f0f0f",
        '& .MuiButton-label':{
            color:"#fff",
        }
    },
    primary:{
        backgroundColor:"#0f0f0f",
        '& .MuiButton-label':{
            color:"#0f0f0f",
        }
    },

}))
export default function ActionButton(props) {
    const {color,children,onClick}=props;
    const classes=useStyles();
  return (
      <Button  onClick={onClick} className={`${classes.root} ${classes[color]}`} text="X">
          {children}
      </Button>
  )
}
