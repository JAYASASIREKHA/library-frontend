import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import './Signin.css';

function Signin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const history = useHistory();

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            console.log('Attempting login with:', { email: formData.email });
            
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password
                })
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Full server response:', data);

            if (response.ok) {
                console.log('Login successful, storing token and user data');
                localStorage.setItem('token', data.token);
                
                dispatch({ 
                    type: "LOGIN_SUCCESS", 
                    payload: {
                        ...data.user,
                        _id: data.user._id
                    }
                });
                console.log('User context updated with:', data.user);
                
                const redirectPath = data.user.userType === 'admin' ? "/dashboard@admin" : "/dashboard@member";
                console.log('Redirecting to:', redirectPath);
                history.push(redirectPath);
            } else {
                console.log('Login failed:', data.message);
                setErrors(prev => ({
                    ...prev,
                    submit: data.message || 'Invalid credentials'
                }));
            }
        } catch (error) {
            console.error("Login Error:", error);
            setErrors(prev => ({
                ...prev,
                submit: 'Network error. Please try again.'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-card">
                <h2>Welcome Back</h2>
                <p className="subtitle">Sign in to your account</p>

                {errors.submit && (
                    <div className="error-message">{errors.submit}</div>
                )}

                <form onSubmit={handleSubmit} className="signin-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    <button 
                        type="submit" 
                        className="signin-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="register-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default Signin;
