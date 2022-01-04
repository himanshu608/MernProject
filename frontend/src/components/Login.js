import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './login.css'
import {setToken} from '../userSlice'
import { useDispatch } from 'react-redux';

function Login() {
    const [user,setUser]=useState({
        email:null,
        password:null
    });
    const [err,setError] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleLogin(){
        if(user.email && user.password){
            fetch('http://127.0.0.1:5000/login',{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
              })
              .catch(err => console.log(err))
              .then(res=>{
                  if(res.status !=200){
                        setError('user not found please register first')
                  }else{
                      setError(null)
                  }
                 return res.text()
        
              })
              .then((data) =>{
                  if(!err){
                    dispatch(setToken(data))
                    navigate('/profile')
                  }
              })
        }else{
            alert('all fields are required')
        }
    }
    return (
        <div className="login">
                <h1>Login</h1>
                <div className="regist_form">
                    <input value={user.email} onChange={e=>setUser(pre=>({...pre,email:e.target.value}))} type="email" placeholder='Email'></input>
                    <input value={user.password} onChange={e=>setUser(pre=>({...pre,password:e.target.value}))} type="password" placeholder='Password'></input>
                    <button onClick={handleLogin}>Login</button>
                </div>
                <h2>{err}</h2>
        </div>
    )
}

export default Login
