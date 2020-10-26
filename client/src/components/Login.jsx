import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import {
	RiEyeCloseLine,
	RiEyeLine,
	RiLoginCircleLine,
	RiLockUnlockLine,
} from "react-icons/ri";

import axios from "axios";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

//Box notification
import { toast } from "react-toastify";

const Login = () => {
	const [demoAccount, setDemoAccount] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	//Fetching user data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:8080/api/users/1'
            );
            setDemoAccount(result.data);
        };
        fetchData()
    }, []);

	const [cookies, setCookie] = useCookies(["access_token"]);
	const history = useHistory();

	//Add user demo account data
	const handleDemoAccount = () => {
		setUsername(demoAccount.email);
		setPassword('demo')
	}

	const handleLoginForm = (e) => {
		e.preventDefault();
		axios
			.post("http://127.0.0.1:8080/api/auth/login", {
				identity: username,
				password: password,
			})
			.then((response) => {
				console.log(response.data);
				if (response.data.status === "success") {
					setCookie("access_token", response.data.data, {
						path: "/",
					});
					history.push("/");
				}
			})
			.catch((error) => {
				toast.error("Wrong email or password.")
			});
	};

	return (
		<div className="login-page">
			<h1>Login page</h1>
			<p>Enter your username and password below.</p>
			<button onClick={(e) => handleDemoAccount(e)} className="demo-account-btn"><RiLockUnlockLine /> Use demo account</button>
			<div className="login-form-wrapper">
				<form onSubmit={(e) => handleLoginForm(e)}>
					{/* username */}
					<input
						name="username"
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<div className="login-pass">
						{/* password */}
						<input
							name="password"
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{password !== "" && (
							<span
								className="pass-icon"
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? (
									<RiEyeLine />
								) : (
									<RiEyeCloseLine />
								)}
							</span>
						)}
					</div>
					<button type="submit" className="submit-btn center">
						<div className="icon">
							<RiLoginCircleLine />
						</div>{" "}
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
