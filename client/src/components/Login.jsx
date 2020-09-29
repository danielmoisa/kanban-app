import React, { useState } from 'react'

import './Login.scss'

import { RiEyeCloseLine, RiEyeLine, RiLoginCircleLine } from 'react-icons/ri'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="login-page">
            <h1>Login page</h1>
            <p>Enter your username and password below.</p>
            <div className="login-form-wrapper">
                <form>
                    <input type="text" placeholder="Username"/>
                   <div className="login-pass">
                   <input type={ showPassword ? 'text' : 'password' } placeholder="Password" />
                    <span className="pass-icon" onClick={ () => setShowPassword(!showPassword) }>
                        { showPassword ? <RiEyeLine /> : <RiEyeCloseLine /> }
                    </span>
                   </div>
                    <button type="submit" className="submit-btn center"><div className="icon"><RiLoginCircleLine /></div> Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
