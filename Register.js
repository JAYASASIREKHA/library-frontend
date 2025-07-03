import React, { useState } from 'react';
import './Register.css';
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

function Register() {
    const [userFullName, setUserFullName] = useState('');
    const [admissionId, setAdmissionId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [userType, setUserType] = useState('student');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState(null);
    const [dobString, setDobString] = useState('');
    const [success, setSuccess] = useState('');
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (userFullName && email && password && mobileNumber && userType && gender && age && dobString) {
            try {
                // Convert mobileNumber and age to numbers
                const mobileNumberNum = parseInt(mobileNumber, 10);
                const ageNum = parseInt(age, 10);
                
                if (isNaN(mobileNumberNum)) {
                    alert("Please enter a valid mobile number");
                    return;
                }

                if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
                    alert("Please enter a valid age");
                    return;
                }

                const response = await fetch("http://localhost:5000/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ 
                        userFullName, 
                        admissionId, 
                        email, 
                        password,
                        mobileNumber: mobileNumberNum,
                        userType,
                        gender,
                        age: ageNum,
                        dob: dobString
                    })
                });

                const data = await response.json();
                console.log("Register Response:", data);

                if (response.ok) {
                    setSuccess(data.message || 'Registered successfully!');
                    setTimeout(() => history.push("/signin"), 1500);
                } else {
                    alert(data.message || 'Registration failed');
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Failed to register");
            }
        } else {
            alert("Please fill in all required fields");
        }
    };

    return (
        <div className='register-container'>
            <div className='register-card'>
                <form onSubmit={handleRegister}>
                    <h2 className="register-title">Register</h2>
                    <p className="line"></p>

                    {success && <div className="success-message"><p>{success}</p></div>}

                    <div className='register-fields'>
                        <label><b>Full Name</b></label>
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            value={userFullName}
                            onChange={(e) => setUserFullName(e.target.value)}
                            required
                        />

                        <label><b>Admission ID</b></label>
                        <input
                            type="text"
                            placeholder="Enter Admission ID"
                            value={admissionId}
                            onChange={(e) => setAdmissionId(e.target.value)}
                        />

                        <label><b>Email</b></label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label><b>Mobile Number</b></label>
                        <input
                            type="tel"
                            placeholder="Enter Mobile Number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                        />

                        <label><b>Gender</b></label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        <label><b>Age</b></label>
                        <input
                            type="number"
                            placeholder="Enter Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            min="0"
                            max="120"
                        />

                        <label><b>Date of Birth</b></label>
                        <DatePicker
                            className="date-picker"
                            placeholderText="MM/DD/YYYY"
                            selected={dob}
                            onChange={(date) => { 
                                setDob(date); 
                                setDobString(moment(date).format("MM/DD/YYYY")) 
                            }}
                            dateFormat="MM/dd/yyyy"
                            required
                        />

                        <label><b>User Type</b></label>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            required
                        >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                        </select>

                        <label><b>Password</b></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className='register-button' type="submit">Register</button>
                    <p className="signin-link">Already have an account? <a href="/signin">Log In</a></p>
                </form>
            </div>
        </div>
    );
}

export default Register;
