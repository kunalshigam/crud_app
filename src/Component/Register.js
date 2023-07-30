import React, { useContext } from 'react'
import { NavLink , useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { addData } from './Context/ContextProvider';


function Register() {
    const {uData, setUData}=useContext(addData);

    const navigate=useNavigate("")
    const [inputValue, setinputValue] = useState({
        Name: "",
        Email: "",
        Age: "",
        Mobile: "",
        Work: "",
        Address: "",
        Description: ""
    })

    const handleChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target
        setinputValue((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const addInputData = async (e) => {
        e.preventDefault();

        const { Name, Email, Age, Mobile, Work, Address, Description } = inputValue

        const res = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Name, Email, Age, Mobile, Work, Address, Description
            })
        });

        const data = await res.json();
        console.log(data);
        
        if(res.status === 422 || !data){
            alert("error");
            console.log("error");
        }else{
            navigate("/")
            setUData(data)
        }
    }
    return (
        <>
        <div className='container'>
            <NavLink to='/'>Home</NavLink>
            <form>
                <div className="row mt-4">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="text" name='Name' value={inputValue.Name} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Email</label>
                        <input type="email" name='Email' value={inputValue.Email} onChange={handleChange} class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Age</label>
                        <input type="number" name='Age' value={inputValue.Age} onChange={handleChange} class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Mobile</label>
                        <input type="number" name='Mobile' value={inputValue.Mobile} onChange={handleChange} class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Work</label>
                        <input type="text" name='Work' value={inputValue.Work} onChange={handleChange} class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Address</label>
                        <input type="text" name='Address' value={inputValue.Address} onChange={handleChange} class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">Description</label>
                        <textarea name='Description' value={inputValue.Description} onChange={handleChange} class="form-control" id="exampleInputPassword1" cols='30' rows='5' />
                    </div>

                    <button type="submit" class="btn btn-primary" onClick={addInputData}>Submit</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Register