import React from 'react'
import './header.css'
import {  Link} from 'react-router-dom'
function Header() {
    return (
        <div className="header">
            <h1>MernProject</h1>
            <div className="header_routes">
            <Link style={{textDecoration:'none',color:'white'}} to='/'><h2>Register</h2></Link>
            <Link style={{textDecoration:'none',color:'white'}} to='/login'><h2>Login</h2></Link>
            <Link style={{textDecoration:'none',color:'white'}} to='/profile'><h2>Profile</h2></Link>
            </div>
        </div>
    )
}

export default Header
