import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import './Login.scss'

import { RiEyeCloseLine, RiEyeLine, RiLoginCircleLine, RiArrowGoBackFill } from 'react-icons/ri'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-page">
            <div className="back-home">
                <Link to="/" className="center"><RiArrowGoBackFill /> Back to Home</Link>
            </div>
            <h1>Login page</h1>
            <p>Enter your username and password below.</p>
            <div className="login-form-wrapper">
                <form>
                    {/* username */}
                    <input name="username" type="text" placeholder="Username" value={ username } onChange={ e => setUsername(e.target.value) }/>
                   <div className="login-pass">
                    {/* password */}
                   <input name="password" type={ showPassword ? 'text' : 'password' } placeholder="Password" value={password} onChange={ e => setPassword(e.target.value) } />
                    { password !== '' && 
                        <span className="pass-icon" onClick={ () => setShowPassword(!showPassword) }>
                            { showPassword ? <RiEyeLine /> : <RiEyeCloseLine /> }
                        </span>
                    }
                   </div>
                    <button type="submit" className="submit-btn center"><div className="icon"><RiLoginCircleLine /></div> Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
