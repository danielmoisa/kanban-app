import React, { useState, useEffect } from 'react';

import axios from 'axios'

import './EditAccount.scss';

//Notification box
import { toast } from "react-toastify";

import { BsPlus } from "react-icons/bs";

const EditAccount = () => {
    const [user, setUser] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');

    //Fetching user data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:8080/api/users'
            );
            setUser(result.data);
        };
        fetchData()
    }, []);


    const updateAccount = (id, newUpdatedAccount) => {
        const request = axios.patch(`http://localhost:8080/api/users/${id}`, newUpdatedAccount)
        return request.then( response => response.data)
    }

    //Update username and email
	const updateUserInfo = (id) => {
        const updateUsername = { ...user, username: newUsername, email: newEmail };
        updateAccount(id, updateUsername)
        toast.success('Account info updated')
	};

    return (
        <div>
            <div className="edit-account">
                <h2>Account</h2>
                {user && user.map(singleUser => (
                    <div className="edit-account-form" key={singleUser.ID}>
                        {/* Name */}
                        <label htmlFor="account-name">Account username</label>
                        <input type="text" name="account-name" defaultValue={singleUser.username} onChange={ e => setNewUsername(e.target.value) } />
                        {/* Email */}
                        <label htmlFor="account-email">Account email</label>
                        <input type="text" name="account-email" defaultValue={singleUser.email} onChange={ e => setNewEmail(e.target.value) }/>
                       	{/* submit */}
                        <button type="submit" className="submit-btn center" onClick={() => updateUserInfo(singleUser.ID)}>
                            <div className="icon">
                                <BsPlus />
                            </div>
                            Update Account Info
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EditAccount
