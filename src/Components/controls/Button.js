import React from 'react'
import { Button as MuiButton, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme=>({
  root: {
    margin:theme.spacing(0.8)
  },
  label:{
    textTransform:"none"
  }
}))


export function Button(props) {
  const classes=useStyles();
  const {variant,size,color,text,onClick,...other}=props
  return (
      <MuiButton  variant={variant||"contained"} size={size||"large"} color={color||"primary"} onClick={onClick} {...other} classes={{root:classes.root,label:classes.label}}>{text}
      </MuiButton>
  )
}
