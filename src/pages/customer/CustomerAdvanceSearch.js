import { Grid, TextField, makeStyles, Paper, AppBar, Button } from '@material-ui/core';
import React from 'react'
import { useState, useEffect } from "react";
import { useForm, Form } from '../../Components/useForm';
import controls from "../../Components/controls/controls";
import * as CustomerService from "../../services/CustomerService"
import useTable from '../../Components/useTable';
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
    const {search}=props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Did' in fieldValues)
            temp.Did = fieldValues.Did ? "" : "This field is required"
        if ('CN' in fieldValues)
            temp.CN = fieldValues.CN ? "" : "This field is required"
        if ('Iid' in fieldValues)
            temp.Iid = fieldValues.Iid ? "" : "This field is required"
        if ('BY' in fieldValues)
            temp.BY = fieldValues.BY ? "" : "This field is required"
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
        if (validate())
            search(values)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <controls.Input name="CN" label='Customer Number' value={values.CN} onChange={handleChange} error={errors.CN} />
                    <controls.Input name="Did" label='Document Id' value={values.Did} onChange={handleChange} error={errors.Did} />
                </Grid>
                <Grid item xs={6}>
                    <controls.Input name="Iid" label='Invoice Id' value={values.Iid} onChange={handleChange} error={errors.Iid} />
                    <controls.Input name="BY" label='Business Year' value={values.BY} onChange={handleChange} error={errors.BY} />
                </Grid>
            </Grid>
            <div>
                <controls.Button text="Search" type="submit" />
                <controls.Button text="RESET" color="white" onClick={resetForm} />
            </div>
        </Form>
    )
}
