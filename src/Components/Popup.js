import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import controls from './controls/controls'
import CloseIcon from '@material-ui/icons/Close';
const useStyles=makeStyles(theme=>({
    dialogWrapper:{
        padding:theme.spacing(2),
        position:'absolute',
        top:theme.spacing(5),
        backgroundColor: "#2a3e4c",
    },
    dialogTitle:{
        paddingTop:'0px'
    },
    tp:{
        color:"#fff"
    }

}))
export default function Popup(props) {
    const {title,children,openPopup,setOpenPopup,setAdvanceSearch}=props
    const classes=useStyles()
  return (
      <Dialog open={openPopup} maxWidth="lg" classes={{paper:classes.dialogWrapper}}>
          <DialogTitle className={classes.dialogTitle}>
              <div style={{display:'flex'}}>
                  <Typography variant='h6' component='div' style={{flexGrow:1}} className={classes.tp}>{title}</Typography>
                  <controls.ActionButton color="secondary" onClick={()=>{setOpenPopup(false);setAdvanceSearch(false)}}>
                      <CloseIcon/>
                  </controls.ActionButton>
              </div>
          </DialogTitle>
          <DialogContent dividers>
              {children}
          </DialogContent>
      </Dialog>
  )
}
