import React, { useEffect, useState } from 'react'
import CustomerForm from "./CustomerForm";
import CustomerEditForm from './CustomerEditForm';
import CustomerAdvanceSearch from './CustomerAdvanceSearch';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Table, TableHead, Checkbox, TableContainer, InputAdornment,Grid,ButtonGroup,Button,AppBar,Toolbar} from "@material-ui/core";
import useTable from "../../Components/useTable";
import * as customerService from "../../services/CustomerService";
import { Search } from "@material-ui/icons";
import controls from '../../Components/controls/controls';
import Popup from '../../Components/Popup';
import Notification from '../../Components/Notification';
import ConfirmDialog from '../../Components/ConfirmDialog';
import ReplayIcon from '@material-ui/icons/Replay';
const useStyles = makeStyles(theme => ({
  root: {
    minHeight:"74vh",
    backgroundColor: "#253742",
  },
  tc: {
    width:"max-content",
  },
  container:{
    maxHeight:440,
  },
  bg:{
    color:"#fff"
  }
  
}))
const useStyles1 = makeStyles(theme=>({
  root: {
      backgroundColor: "#253742",
  },

}))
const headCells = [
  { id: 'SNO', label: 'SI NO' },
  { id: 'BC', label: 'Business Code' },
  { id: 'Did', label: 'Document Id' },
  { id: 'IC', label: 'Invoice Currency' },
  { id: 'BCD', label: 'Baseline Create Date', disableSorting: true },
  { id: 'CN', label: 'Customer Number' },
  { id: 'PD', label: 'Posting Date', disableSorting: true },
  { id: 'DT', label: 'Document type', disableSorting: true },
  { id: 'CPT', label: 'Customer Payment Terms', disableSorting: true },
  { id: 'CD', label: 'Clear Date', disableSorting: true },
  { id: 'DCD', label: 'Document Create Date', disableSorting: true },
  { id: 'Pid', label: 'Posting Id' },
  { id: 'Iid', label: 'Invoice Id' },
  { id: 'BY', label: 'Business Year' },
  { id: 'DD', label: 'Due Date', disableSorting: true },
  { id: 'TOM', label: 'Total open amount' },
  { id: 'AB', label: 'Aging Bucket' },
]

export default function Customer() {
  const classes = useStyles();
  const classes1 = useStyles1();
  const [records, setRecords] = useState([])
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [selected, setSelected] = React.useState([]);
  const [filter,setFilter]=useState({fn:items=>{return items;}});
  const [advanceFilter,setAdvanceFilter]=useState({fn:items=>{return items;}});
  const [openPopup,setOpenPopup]=useState(false);
  const [disableEdit,setDisableEdit]=useState(true);
  const [disableAdd,setDisableAdd]=useState(false);
  const [disableDelete,setDisableDelete]=useState(true);
  const [disablePredict,setDisablePredict]=useState(true);
  const [notify,setNotify]=useState({isOpen:false,message:"",type:""});
  const [confirmDialog,setConfirmDialog]=useState({isOpen:false,title:"",subtitle:""});
  const [advanceSearch,setAdvanceSearch]=useState(false);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting, emptyRows } = useTable(records, headCells,advanceSearch?advanceFilter:filter)

  useEffect(async()=>{
    setRecords(await customerService.getData())
},[])

  const handleSearch = e=>{
      let target=e.target
      setFilter({
          fn:items=>{
              if(target.value=="")
              return items;
              else
              return items.filter(x=>x.id==target.value);
          }
      })
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = records.map((item) => item.id);
      setSelected(newSelecteds);
      setDisableAdd(true);
      setDisableEdit(true);
      setDisableDelete(false);
      setDisablePredict(false);
      return;
    }
    setDisableDelete(true);
    setDisablePredict(true);
    setDisableAdd(false);
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    if(newSelected.length==1){
      setDisableEdit(false);
    }else{
      setDisableEdit(true);
    }
    setSelected(newSelected);
    if(newSelected.length==0){
      setDisableAdd(false);
    }else{
      setDisableAdd(true);
    }
    setSelected(newSelected);
    if(newSelected.length>=1){
      setDisableDelete(false);
      setDisablePredict(false);
    }else{
      setDisableDelete(true);
      setDisablePredict(true);
    }
    setSelected(newSelected);

  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const addOrEdit=(customer,resetForm)=>{
    if(customer.id===0){
      customerService.insertData(customer,records[records.length-1]['id']+1);
    }
    else{
       customerService.updateData(customer);
    }
    setDisablePredict(true);
    setDisableEdit(true);
    setDisableDelete(true);
    setDisableAdd(false);
    setOpenPopup(false)
    setSelected([])
    //setRecords(customerService.getAllCustomer())
    setNotify({
      isOpen:true,
      message:"Submitted Sucessfully",
      type:"success"
    })
  }

  const onDelete=()=>{
    if(disableDelete==false){
      setConfirmDialog({
        ...confirmDialog,
        isOpen:false
      })
      customerService.deleteData(selected)
      setSelected([])
      setDisableAdd(false)
      setDisablePredict(true);
      setDisableEdit(true)
      setDisableDelete(true)
      //setRecords(customerService.getAllCustomer())
      setNotify({
        isOpen:true,
        message:"Deleted Sucessfully",
        type:"error"
      })
    }
  }
  const search=(data)=>{
    setAdvanceFilter({
        fn:items=>{
            return items.filter(x=>((x.Did==data.Did) && (x.CN==data.CN) && (x.Iid==data.Iid) && (x.BY==data.BY)));
        }
    })
    setOpenPopup(false);
  }

   const openInPopup=()=>{
     if(disableEdit==false){
       setAdvanceSearch(false);
       setRecordForEdit(records.filter(x=>x.id==selected[0])[0])
       setOpenPopup(true)

     }
   }
   const openAdvancePopup=()=>{
      setAdvanceSearch(true);
      setOpenPopup(true)
  }
   const refreshPage=()=>{
    window.location.reload(false);
   }
   const handlePredict=()=>{
     if(disablePredict==false){
        customerService.getPrediction(records,selected)
        setDisableAdd(false);
        setDisableEdit(true);
        setDisableDelete(true);
        setDisablePredict(true);
        setSelected([])
        
     }
   }


  return (
    < >
      <AppBar className={classes1.root} position="static" elevation={0}>
        <Toolbar>
          <Grid container>
            <Grid item sm>
              <ButtonGroup size='large' color="primary" aria-label="outlined primary button group">
                <Button onClick={handlePredict} disabled={disablePredict?true:false} className={classes.bg}>PREDICT</Button>
                <Button  className={classes.bg}>ANALYTICS VIEW</Button>
                <Button onClick={()=>{openAdvancePopup()}}  className={classes.bg}>ADVANCE SEARCH</Button>
                <Button onClick={refreshPage}  className={classes.bg}><ReplayIcon/></Button>
              </ButtonGroup>
            </Grid>
            <Grid item sm>
              <controls.Input label="Search Customer Id"
                InputProps={{
                  startAdornment: (<InputAdornment position="start">
                    <Search />
                  </InputAdornment>)
                }}
                onChange={handleSearch}
              />
            </Grid>
            <Grid item >
              <ButtonGroup size='large' color="primary" aria-label="outlined primary button group">
                <Button className={classes.bg} onClick={()=>{setAdvanceSearch(false);setOpenPopup(true);} } disabled={disableAdd?true:false}>ADD</Button>
                <Button className={classes.bg} onClick={()=>{openInPopup()}} disabled={disableEdit?true:false}>EDIT</Button>
                <Button className={classes.bg} onClick={()=>{setConfirmDialog({isOpen:true,title:"Delete Records?",subtitle:"Are you sure you want to delete this record[s]?",onConfirm:()=>onDelete()})}} disabled={disableDelete?true:false}>DELETE</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      
      <Paper sx={{ width: '100%', overflow: 'hidden' }} className={classes.root}>
        <TableContainer className={classes.container}>
          
          <TblContainer>
            <TblHead numSelected={selected.length} onSelectAllClick={handleSelectAllClick} />
            <TableBody>
              {
                recordsAfterPagingAndSorting().map((item, index) => {
                  const isItemSelected = isSelected(item.id);
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <TableRow key={item.id}
                      onClick={(event) => handleClick(event, item.id)}
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="secondary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        /></TableCell>

                      <TableCell padding="none">{item.id}</TableCell>
                      <TableCell padding="none">{item.BC}</TableCell>
                      <TableCell padding="none">{item.Did}</TableCell>
                      <TableCell padding="none">{item.IC}</TableCell>
                      <TableCell padding="none">{item.BCD}</TableCell>
                      <TableCell padding="none">{item.CN}</TableCell>
                      <TableCell padding="none">{item.PD}</TableCell>
                      <TableCell padding="none">{item.DT}</TableCell>
                      <TableCell padding="none">{item.CPT}</TableCell>
                      <TableCell padding="none">{item.CD}</TableCell>
                      <TableCell padding="none">{item.DCD}</TableCell>
                      <TableCell padding="none">{item.Pid}</TableCell>
                      <TableCell padding="none">{item.Iid}</TableCell>
                      <TableCell padding="none">{item.BY}</TableCell>
                      <TableCell padding="none">{item.DD}</TableCell>
                      <TableCell padding="none">{item.TOM}</TableCell>
                      <TableCell padding="none">{item.AB==null?"N/A":item.AB}</TableCell>
                    </TableRow>
                  )
                })
              }
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 41 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}


            </TableBody>

          </TblContainer>
        </TableContainer>
        <TblPagination />
      </Paper>
      {disableAdd || (advanceSearch)?"":<Popup
      title="Customer Form"
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}>
        <CustomerForm addOrEdit={addOrEdit}/> 
      </Popup>}
      {disableEdit || (advanceSearch)?"":<Popup
      title="Edit Form"
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}>
        <CustomerEditForm recordForEdit={recordForEdit} addOrEdit={addOrEdit}/> 
      </Popup>}
      {advanceSearch?<Popup
      title="Advance Search"
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
      setAdvanceSearch={setAdvanceSearch}>
        <CustomerAdvanceSearch search={search}/>
      </Popup>:""}

      <Notification
      notify={notify}
      setNotify={setNotify}/>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>

    </>
  )
}
