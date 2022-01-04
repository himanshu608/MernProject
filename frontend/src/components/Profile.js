import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './profile.css'
function Profile() {
    const state = useSelector(state => state.token);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState();
    function getInfo() {

        fetch('http://127.0.0.1:5000/profile', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': state
            },
        })
            .then(res => res.text())
            .then(res => {
                setUser(JSON.parse(res));
                
                setShow(true);
            })
            .catch(err => console.log(err))


    }
    console.log(user)
    return (
        <div className="profile">
            <h1>Profile page</h1>
            <button onClick={getInfo}>Show user profile</button>
            {
                show &&
                <div className="profile_info">
                    <h3>{`First name    : ${user?.firstName}`}</h3>
                    <h3>{`Last name     : ${user?.lastName}`}</h3>
                    <h3>{`Email         : ${user?.email}`}</h3>
                    <h3>{`Phone Number  : ${user?.phone}`}</h3>
                    <h3>{`Address       : ${user?.Address}`}</h3>
                </div>
            }
        </div>
    )
}

export default Profile
