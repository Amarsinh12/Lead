import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import email_icon from '../../Assests/email.png';
import password_icon from '../../Assests/password.png';
const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
    const navigate = useNavigate();

    const initialData = {
        email: "",
        password: "",
        userType: "", // Tracks the selected user type
    };

    const [inputData, setInputData] = useState(initialData);
    const [errorMessage, setErrorMessage] = useState('');

    const handleData = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        console.log("Submitting login with data:", inputData);

        try {
            const response = await axios.post(`${API_URL}/login`, inputData);

            console.log("Response data:", response.data);

            if (response.status === 200 && response.data.message === "exist") {
                alert("Login Successful");

                // Store user data in localStorage
                localStorage.setItem('User', JSON.stringify(response.data.user));

                // Redirect based on user type
                if (inputData.userType === "Customer") {
                    navigate("/Customer"); // Navigates to Customer.js
                } else if (inputData.userType === "server") {
                    window.location.href = "http://localhost:8501"; // Opens the external site
                }
            } else {
                setErrorMessage("Invalid login credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("An error occurred during login. Please try again.");
        }
    };

    return (
        <div className="containerlogin">
            <div className="containerl">
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="input">
                            <img src={email_icon} alt="Email Icon" style={{ width: '30px', height: '30px' }} />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email Id" 
                                value={inputData.email} 
                                onChange={handleData} 
                                autoComplete="email" 
                                required 
                            />
                        </div>

                        <div className="input">
                            <img src={password_icon} alt="Password Icon" style={{ width: '30px', height: '30px' }} />
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={inputData.password} 
                                onChange={handleData} 
                                autoComplete="new-password" 
                                required 
                            />
                        </div>

                        <div className='user-type'>
                            <label>
                                <input
                                    type="radio"
                                    name="userType"
                                    value="server"
                                    onChange={handleData}
                                    required
                                />
                                Server
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="userType"
                                    value="Customer"
                                    onChange={handleData}
                                    required
                                />
                                Customer
                            </label>
                        </div>

                        {errorMessage && <p className="error">{errorMessage}</p>}
                    </div>

                    <div className="account1">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </div>
                    <div className='forget-password'>
                        <Link to="/forgetp"
                        className='forget-password-link'>Forget Password?</Link>
                    </div>
                    <div className="submit-container1">
                        <button type="submit" className="submit1">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
