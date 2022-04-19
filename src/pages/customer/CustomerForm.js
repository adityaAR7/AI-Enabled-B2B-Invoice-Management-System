import { Grid, TextField, makeStyles, Paper, AppBar, Button } from '@material-ui/core';
import React from 'react'
import { useState, useEffect } from "react";
import { useForm, Form } from '../../Components/useForm';
import controls from "../../Components/controls/controls";
import * as CustomerService from "../../services/CustomerService"
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
    const {addOrEdit}=props
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

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={3}>
                    <controls.Input name="BC" label='Business Code' value={values.BC} onChange={handleChange} error={errors.BC} />
                    <controls.Input name="Did" label='Document Id' value={values.Did} onChange={handleChange} error={errors.Did} />
                    <controls.Input name="IC" label='Invoice Currency' value={values.IC} onChange={handleChange} error={errors.IC} />
                    <controls.Input name="BCD" label='Baseline Create Date' type="date" value={values.BCD} onChange={handleChange} />
                </Grid>
                <Grid item xs={3}>
                    <controls.Input name="CN" label='Customer Number' value={values.CN} onChange={handleChange} error={errors.CN} />
                    <controls.Input name="PD" label='Posting Date' type="date" value={values.PD} onChange={handleChange} />
                    <controls.Input name="DT" label='Document type' value={values.DT} onChange={handleChange} error={errors.DT} />
                    <controls.Input name="CPT" label='Customer Payment Terms' value={values.CPT} onChange={handleChange} error={errors.CPT} />
                </Grid>
                <Grid item xs={3}>
                    <controls.Input name="CD" label='Clear Date' type="date" value={values.CD} onChange={handleChange} />
                    <controls.Input name="DCD" label='Document Create Date' type="date" value={values.DCD} onChange={handleChange} />
                    <controls.Input name="Pid" label='Posting Id' value={values.Pid} onChange={handleChange} error={errors.Pid} />
                    <controls.Input name="Iid" label='Invoice Id' value={values.Iid} onChange={handleChange} error={errors.Iid} />
                </Grid>
                <Grid item xs={3}>
                    <controls.Input name="BY" label='Business Year' value={values.BY} onChange={handleChange} error={errors.BY} />
                    <controls.Input name="DD" label='Due Date' type="date" value={values.DD} onChange={handleChange} />
                    <controls.Input name="TOM" label='Total open amount' value={values.TOM} onChange={handleChange} error={errors.TOM} />
                </Grid>
            </Grid>
            <div>
                <controls.Button text="ADD" type="submit" />
                <controls.Button text="RESET" color="white" onClick={resetForm} />
            </div>
        </Form>
    )
}
