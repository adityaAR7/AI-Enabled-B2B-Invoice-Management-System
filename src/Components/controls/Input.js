import { makeStyles, TextField } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles(theme=>({
    root: {
        color: "#fff",  
    }
  
  }))

export function Input(props) {
    const classes=useStyles()
    const { name, label, type,value,error=null, onChange,...other} = props;
    return (
        <TextField
            variant='outlined'
            label={label}
            value={value}
            name={name}
            type={type}
            InputLabelProps={{
                shrink: true,
                style: { fontFamily: 'nunito', color: 'white'}
            }}
            {...other}
            onChange={onChange}
            {...(error && {error:true,helperText:error})}
        />
    )
}
