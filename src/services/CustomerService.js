import axios from "axios";
// import { useEffect, useState } from "react";
// const KEY={
//     customers:'customers',
//     customersId:'customersId'
// }
// export function insertCustomer(data){
//     let customers=getAllCustomer();
//     data['id']=generateId()
//     customers.push(data)
//     localStorage.setItem(KEY.customers,JSON.stringify(customers))
// }
// export function updateCustomer(data){
//     let customers=getAllCustomer();
//     let recordIndex=customers.findIndex(x=>x.id==data.id)
//     customers[recordIndex]={...data}
//     localStorage.setItem(KEY.customers,JSON.stringify(customers))
// }
// export function deleteCustomer(selected){
//     let customers=getAllCustomer();
//     customers=customers.filter(x=>selected.indexOf(x.id)==-1)
//     localStorage.setItem(KEY.customers,JSON.stringify(customers))
// }

// export  function generateId(){
//     if(localStorage.getItem(KEY.customersId)==null){
//         localStorage.setItem(KEY.customersId,'0')
//     }
//     var id=parseInt(localStorage.getItem(KEY.customersId))
//     localStorage.setItem(KEY.customersId,(++id).toString())
//     return id;

// }
// export function getAllCustomer(){
//     if(localStorage.getItem(KEY.customers)==null){
//         localStorage.setItem(KEY.customers,JSON.stringify([]))
//     }
//    return JSON.parse(localStorage.getItem(KEY.customers));
// }
export const insertData = async(data,id)=>{
    data['id']=id
    let str="id="+data['id']+"&BC="+data['BC']+"&Did="+data['Did']+"&IC="+data['IC']+"&BCD="+data['BCD']+"&CN="+data['CN']+"&PD="+data['PD']+
            "&DT="+data['DT']+"&CPT="+data['CPT']+"&CD="+data['CD']+"&DCD="+data['DCD']+"&Pid="+data['Pid']+"&Iid="+data['Iid']+"&BY="+data['BY']+
            "&DD="+data['DD']+"&TOM="+data['TOM'];
    let response;//=await axios.get("http://localhost:8080/Backened/Add?"+str)
    return response;
}
export const updateData = async(data)=>{
    let str="id="+data['id']+"&IC="+data['IC']+"&CPT="+data['CPT'];
    let response;//=await axios.get("http://localhost:8080/Backened/Update?"+str)
    return response;
}
export const deleteData = async(selected)=>{
    let str="selected="+selected[0];
    for(var i=1;i<selected.length;i++){
        str=str+"&selected="+selected[i];
    }
    let response;//=await axios.get("http://localhost:8080/Backened/Delete?"+str);
    return response;
}

export const getData = async()=>{
    let response;//=await axios.get("http://localhost:8080/Backened/DataLoading")
    return response.data.records;
}
export const updateBucket = async(data)=>{
    let str="Did="+data['doc_id']+"&AB="+data['aging_bucket'];
    let response;//=await axios.get("http://localhost:8080/Backened/UpdateBucket?"+str)
    return response;
}

export const getPrediction = async(records,selected)=>{
    let filterRecords=records.filter(x=>selected.indexOf(x.id)!=-1);
    let doc_ids=filterRecords.map(x=>x.Did);
    let response;//=await axios.post("http://127.0.0.1:5000/get_prediction",{data:doc_ids},{type:"application/json"});
    let docs=response.data.map(e=>e.doc_id)
    let leftDoc=doc_ids.filter(e=>!docs.includes(e));
    let leftData=records.filter(e=>leftDoc.includes(e.Did));
    if(leftData.length>0){
        leftData.map(async(data)=>{
            let response1=await get_new_prediction(data);
            console.log(response1[0])
            let docUpdate=await updateBucket(response1[0]);
        })
    }
    response.data.forEach(async(data)=>{
        let str="Did="+data['doc_id']+"&AB="+data['aging_bucket'];
        let response=await axios.get("http://localhost:8080/Backened/UpdateBucket?"+str)
    })
}
export const get_new_prediction=async(item)=>{
    let BC=item.BC
    let Did=item.Did
    let NC="highradius"
    let BCD=item.BCD
    let CN=item.CN
    let PD=item.PD
    let CPT=item.CPT
    let CD=item.CD
    let BY=item.BY
    let DD=item.DD
    let TOM=item.TOM
    let response;//=await axios.post("http://127.0.0.1:5000/",{BC,Did,NC,BCD,CN,PD,CPT,CD,BY,DD,TOM},{type:"application/json"})
    return response.data

}



