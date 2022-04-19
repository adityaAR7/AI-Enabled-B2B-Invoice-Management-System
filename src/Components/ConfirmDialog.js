import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import controls from './controls/controls'

const useStyles=makeStyles(theme=>({
    dialog:{
        padding:theme.spacing(2),
        position:'absolute',
        top:theme.spacing(5),
        backgroundColor:"#2a3e4c"
        
    },
    dialogContent:{
        textAlign:"center"
    },
    dialogAction:{
        justifyContent:"center"
    }
}))
export default function ConfirmDialog(props) {
    const classes=useStyles()
    const {confirmDialog,setConfirmDialog}=props
  return (
      <Dialog open={confirmDialog.isOpen} classes={{paper:classes.dialog}}>
          <DialogTitle>

          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
              <Typography variant='h6'>
                  {confirmDialog.title}
              </Typography>
              <Typography variant='subtitle2'>
                  {confirmDialog.subtitle}
              </Typography>
          </DialogContent>
          <DialogActions className={classes.dialogAction}>
              <controls.Button text="Cancel" color="default" onClick={()=>setConfirmDialog({...confirmDialog,isOpen:false})}/>
              <controls.Button text="DELETE" color="secondary" onClick={confirmDialog.onConfirm}/>
          </DialogActions>
      </Dialog>
  )
}
