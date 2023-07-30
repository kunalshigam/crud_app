import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addData, UpDateData, delData} from './Context/ContextProvider';
import { useContext } from 'react';

function Home() {
    const { uData, setUData } = useContext(addData);
    // const { updateData, setUpdateData } = useContext(updatDataValue);
    const {upData, setUpData}=useContext(UpDateData);
    const {deleteData, setDeleteData}=useContext(delData);

    const [userData, setUserData] = useState([])
    console.log(userData, 'data')

    const getUserData = async (e) => {

        const res = await fetch('/getdata', {
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

    useEffect(() => {
        getUserData()
    }, [])


    const deleteUser = async (id) => {

        const resp2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deleteDataValue = await resp2.json();
        console.log(deleteDataValue)

        if (resp2.status === 422 || !deleteDataValue) {
            console.log("error")
        } else {
            console.log("user deleted")
            getUserData()
            setDeleteData(deleteDataValue)
        }
    }

    return (
        <>
            {
                uData &&
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!!! {uData.Name}</strong> User Added Successfully
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
            {
                upData &&
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Update!!! {upData.Name}</strong> User Updated Successfully
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
            {
                deleteData &&
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Delete!!! {delData.Name}</strong> User Deleted Successfully
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

            <div className='mt-5'>
                <div className="container">
                    <div className="add-btn mt-2">
                        <a href='/register' className='btn btn-primary'>Add Data</a >
                    </div>
                    <table class="table mt-2">
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">Id</th>
                                <th scope="col">UserName</th>
                                <th scope="col">Email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData && userData?.length > 0 ?
                                    userData?.map((item, index) => (
                                        // console.log(item , 'item')
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.Name}</td>
                                            <td>{item.Email}</td>
                                            <td>{item.Work}</td>
                                            <td>{item.Mobile}</td>
                                            <td className='d-flex justify-content-between'>
                                                <a href={`view/${item._id}`}><button className='btn btn-success'><RemoveRedEyeIcon /></button></a>
                                                <a href={`edit/${item._id}`}> <button className='btn btn-primary' id='key'><EditIcon /></button></a>
                                                <button className='btn btn-danger' onClick={() => deleteUser(item._id)}><DeleteIcon /></button>
                                            </td>
                                        </tr>
                                    ))

                                    :
                                    ""
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}

export default Home