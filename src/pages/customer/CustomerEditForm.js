import { Grid, TextField, makeStyles, Paper, AppBar, Button } from '@material-ui/core';
import React from 'react'
import { useState, useEffect } from "react";
import { useForm, Form } from '../../Components/useForm';
import controls from "../../Components/controls/controls";

const initailValues = {
    id:0,
    BC: '',
    Did: '',
    IC: '',
    BCD: '',
    CN: '',
    PD: '',
    DT: '',
    CPT: '',
    CD: '',
    DCD: '',
    Pid: '',
    Iid: '',
    BY: '',
    DD: '',
    TOM: '',
    AB:''
}


export default function CustomerForm(props) {
    const {addOrEdit,recordForEdit}=props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('BC' in fieldValues)
            temp.BC = fieldValues.BC ? "" : "This field is required"
        if ('Did' in fieldValues)
            temp.Did = fieldValues.Did ? "" : "This field is required"
        if ('IC' in fieldValues)
            temp.IC = fieldValues.IC ? "" : "This field is required"
        if ('CN' in fieldValues)
            temp.CN = fieldValues.CN ? "" : "This field is required"
        if ('DT' in fieldValues)
            temp.DT = fieldValues.DT ? "" : "This field is required"
        if ('CPT' in fieldValues)
            temp.CPT = fieldValues.CPT ? "" : "This field is required"
        if ('Pid' in fieldValues)
            temp.Pid = fieldValues.Pid ? "" : "This field is required"
        if ('Iid' in fieldValues)
            temp.Iid = fieldValues.Iid ? "" : "This field is required"
        if ('BY' in fieldValues)
            temp.BY = fieldValues.BY ? "" : "This field is required"
        if ('TOM' in fieldValues)
            temp.TOM = fieldValues.TOM ? "" : "This field is required"
        setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleChange,
        resetForm
    } = useForm(initailValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            addOrEdit(values,resetForm)
        }
    }
    useEffect(()=>{
        if(recordForEdit!=null){
            setValues({
                ...recordForEdit
            })
        }
    },[recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item >
                    <controls.Input name="IC" label='Invoice Currency' value={values.IC} onChange={handleChange} error={errors.IC} />
                    <controls.Input name="CPT" label='Customer Payment Terms' value={values.CPT} onChange={handleChange} error={errors.CPT} />
                </Grid>
            </Grid>
            <div>
                <controls.Button text="EDIT" type="submit" />
                <controls.Button text="RESET" color="white" onClick={resetForm} />
            </div>
        </Form>
    )
}
