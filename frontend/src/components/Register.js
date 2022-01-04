import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './register.css'
function Register() {
    const [newUser,setNewUser] = useState({
        firstName:null,
        lastName:null,
        email:null,
        password:null,
        phone:null,
        Address:null,
    });
    const navigate = useNavigate();
    const [err,setError] = useState()
    function handleRegister() {
        if(newUser.firstName && newUser.lastName && newUser.email && newUser.password && newUser.phone && newUser.Address){
            fetch('http://127.0.0.1:5000/register',{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
              })
              .catch(err => console.log(err))
              .then((res) =>{
                if(res.status === 200){
                    navigate('/login')
                    setError(null)
                }else if(res.status === 401){
                    setError('User Exist already please Login')
                }else{
                    setError('server error')
                }
                
              })
        }else{
            alert("all fields are required")
        }
    }
    return (
        <div className="register">
                <h1>Register</h1>
                <div className="regist_form">
                    <input onChange={e=>setNewUser(pre=>({...pre,firstName:e.target.value}))} value={newUser.firstName} type="text" placeholder="first name" ></input>
                    <input onChange={e=>setNewUser(pre=>({...pre,lastName:e.target.value}))} value={newUser.lastName} type="text" placeholder="last name"></input>
                    <input onChange={e=>setNewUser(pre=>({...pre,email:e.target.value}))} value={newUser.email} type="email" placeholder="Email"></input>
                    <input onChange={e=>setNewUser(pre=>({...pre,password:e.target.value}))} value={newUser.password} type="password" placeholder="password"></input>
                    <input onChange={e=>setNewUser(pre=>({...pre,phone:e.target.value}))} value={newUser.phone} type="number" placeholder="Phone number"></input>
                    <input onChange={e=>setNewUser(pre=>({...pre,Address:e.target.value}))} value={newUser.Address} type="text" placeholder="Address"></input>
                    <button type="submit" onClick={handleRegister}>Register</button>
                </div>
                <h2>{err}</h2>
        </div>
    )
}

export default Register
