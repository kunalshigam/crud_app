import { Card, CardContent } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';

function Details() {

  const navigate=useNavigate("")
  const {id}=useParams("")
  console.log(id, 'id')
  const [userData, setUserData] = useState([])

  const getUserData = async () => {

    const res = await fetch(`/getuser/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
        alert("error");
    } else {
        setUserData(data)
        console.log('get data');
    }
}

useEffect(()=>{
  getUserData()
},[])

console.log(userData);

const deleteUser = async(id)=>{

  const resp2= await fetch(`/deleteuser/${id}`, {
      method:"DELETE",
      headers:{
          "Content-Type":"application/json"
      }
  });

  const deleteData= await resp2.json();
  console.log(deleteData)

  if(resp2.status === 422 || !deleteData){
      console.log("error")
  }else{
      console.log("user deleted")
      navigate("/")
  }
}

  return (
    Object.keys(userData).length > 0 &&
    <div className='container mt-3'>
      <h1 style={{ fontWeight: 400 }}>Welcome {userData?.Name}</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
           <NavLink to={`/edit/${userData._id}`}> <button className='btn btn-primary mx-2'><EditIcon /></button></NavLink>
           <button className='btn btn-danger' onClick={()=>deleteUser(userData._id)}><DeleteIcon /></button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src="/profile.png" style={{ width: 50 }} alt="profile" />
              <h3 className='mt-3'>Name: <span >{userData?.Name}</span></h3>
              <h3 className='mt-3'> Age: <span >{userData?.Age}</span></h3>
              <p className='mt-3'><MailOutlineIcon /> Email: <span>{userData?.Email}</span></p>
              <p className='mt-3'><WorkIcon /> Occupation: <span>{userData?.Work}</span></p>

            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <div className='mt-5'>
              <p className='mt-5'><PhoneAndroidIcon /> Mobile: <span>{userData?.Mobile}</span></p>
              <p className='mt-3'><LocationOnIcon /> Location: <span>{userData?.Address}</span></p>
              <p className='mt-3'><DescriptionIcon /> Description: <span>{userData?.Description}</span></p>
            </div>
            </div>
          </div>


        </CardContent>
      </Card>
    </div>  )
}


export default Details