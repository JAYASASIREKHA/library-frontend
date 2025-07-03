import React, { useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { Dropdown } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

function AddMember() {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/"
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState(null)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)

    const [userFullName, setUserFullName] = useState("")
    const [admissionId, setAdmissionId] = useState("")
    const [employeeId, setEmployeeId] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [recentAddedMembers, setRecentAddedMembers] = useState([])
    const [userType, setUserType] = useState("Student")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [dob, setDob] = useState(null)
    const [dobString, setDobString] = useState("")

    const genderTypes = [
        { value: "Male", text: "Male" },
        { value: "Female", text: "Female" }
    ]

    const userTypes = [
        { value: 'Staff', text: 'Staff' },
        { value: 'Student', text: 'Student' }
    ]

    //Add a Member
    const addMember = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setSuccessMessage(null)
        setShowSuccessPopup(false)
        
        // Validate required fields
        if (!userFullName || !userType || !age || !dobString || !gender || !address || !mobileNumber || !email || !password) {
            setSuccessMessage("All fields must be filled")
            setIsLoading(false)
            return
        }

        // Validate ID based on user type
        if (userType === "Student" && !admissionId) {
            setSuccessMessage("Admission ID is required for students")
            setIsLoading(false)
            return
        }
        if (userType === "Staff" && !employeeId) {
            setSuccessMessage("Employee ID is required for staff")
            setIsLoading(false)
            return
        }

        // Validate mobile number
        const mobileNumberNum = parseInt(mobileNumber, 10)
        if (isNaN(mobileNumberNum) || mobileNumber.length !== 10) {
            setSuccessMessage("Please enter a valid 10-digit mobile number")
            setIsLoading(false)
            return
        }

        // Validate age
        const ageNum = parseInt(age, 10)
        if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
            setSuccessMessage("Please enter a valid age between 0 and 120")
            setIsLoading(false)
            return
        }

        // Validate date of birth
        const dobDate = new Date(dobString)
        const today = new Date()
        if (dobDate > today) {
            setSuccessMessage("Date of birth cannot be in the future")
            setIsLoading(false)
            return
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setSuccessMessage("Please enter a valid email address")
            setIsLoading(false)
            return
        }

        // Validate password length
        if (password.length < 6) {
            setSuccessMessage("Password must be at least 6 characters long")
            setIsLoading(false)
            return
        }

        const userData = {
            userType: userType,
            userFullName: userFullName,
            admissionId: userType === "Student" ? admissionId : "",
            employeeId: userType === "Staff" ? employeeId : "",
            age: ageNum,
            dob: dobString,
            gender: gender,
            address: address,
            mobileNumber: mobileNumberNum,
            email: email,
            password: password
        }

        try {
            console.log('Sending registration request with data:', userData);
            const response = await axios.post(API_URL + "api/auth/register", userData)
            console.log('Registration response:', response.data);
            
            if (recentAddedMembers.length >= 5) {
                recentAddedMembers.splice(-1)
            }
            setRecentAddedMembers([response.data.user, ...recentAddedMembers])
            
            // Reset form
            setUserFullName("")
            setUserType("Student")
            setAdmissionId("")
            setEmployeeId("")
            setAddress("")
            setMobileNumber("")
            setEmail("")
            setPassword("")
            setGender("")
            setAge("")
            setDob(null)
            setDobString("")
            
            // Show success popup
            setShowSuccessPopup(true)
            setSuccessMessage("Member added successfully!")
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccessPopup(false)
                setSuccessMessage(null)
            }, 3000)
        }
        catch (err) {
            console.error('Registration error:', err);
            if (err.response) {
                switch (err.response.status) {
                    case 409:
                        setSuccessMessage("A member with this email or ID already exists. Please use a different email or ID.");
                        break;
                    case 400:
                        setSuccessMessage(err.response.data.message || "Invalid data provided. Please check your input.");
                        break;
                    case 500:
                        setSuccessMessage("Server error. Please try again later.");
                        break;
                    default:
                        setSuccessMessage(err.response.data.message || "Error adding member. Please try again.");
                }
            } else {
                setSuccessMessage("Network error. Please check your connection and try again.");
            }
        }
        setIsLoading(false)
    }

    //Fetch Members
    useEffect(() => {
        let isMounted = true;
        const getMembers = async () => {
            try {
                console.log('Fetching members from:', API_URL + "api/users/allmembers");
                const response = await axios.get(API_URL + "api/users/allmembers")
                console.log('Members response:', response.data);
                if (isMounted) {
                    const recentMembers = response.data.slice(0, 5)
                    setRecentAddedMembers(recentMembers)
                }
            }
            catch (err) {
                console.error('Error fetching members:', err);
            }
        }
        getMembers()
        
        return () => {
            isMounted = false;
        }
    }, [API_URL])

    return (
        <div>
            <p className="dashboard-option-title">Add a Member</p>
            <div className="dashboard-title-line"></div>
            
            {showSuccessPopup && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    padding: '15px 25px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    borderRadius: '5px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    zIndex: 1000,
                    animation: 'slideIn 0.5s ease-out'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '10px' }}>✓</span>
                        {successMessage}
                    </div>
                </div>
            )}
            
            {successMessage && !showSuccessPopup && (
                <div style={{
                    padding: '10px',
                    margin: '10px 25px',
                    backgroundColor: successMessage.includes('Error') ? '#ffebee' : '#e8f5e9',
                    color: successMessage.includes('Error') ? '#c62828' : '#2e7d32',
                    borderRadius: '4px',
                    textAlign: 'center'
                }}>
                    {successMessage}
                </div>
            )}
            
            <form onSubmit={addMember} className="addmember-form">
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='User Type'
                        fluid
                        selection
                        options={userTypes}
                        value={userType}
                        onChange={(event, data) => setUserType(data.value)}
                    />
                </div>
                <label className="addmember-form-label" htmlFor="userFullName">Full Name<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="text" name="userFullName" value={userFullName} required onChange={(e) => setUserFullName(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor={userType === "Student" ? "admissionId" : "employeeId"}>{userType === "Student" ? "Admission Id" : "Employee Id"}<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="text" value={userType === "Student" ? admissionId : employeeId} required onChange={(e) => { userType === "Student" ? setAdmissionId(e.target.value) : setEmployeeId(e.target.value) }}></input><br />

                <label className="addmember-form-label" htmlFor="mobileNumber">Mobile Number<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="text" value={mobileNumber} required onChange={(e) => setMobileNumber(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="gender">Gender<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Gender'
                        fluid
                        selection
                        value={gender}
                        options={genderTypes}
                        onChange={(event, data) => setGender(data.value)}
                    />
                </div>

                <label className="addmember-form-label" htmlFor="age">Age<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="text" value={age} required onChange={(e) => setAge(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="dob">Date of Birth<span className="required-field">*</span></label><br />
                <DatePicker
                    className="date-picker"
                    placeholderText="MM/DD/YYYY"
                    selected={dob}
                    onChange={(date) => { setDob(date); setDobString(moment(date).format("MM/DD/YYYY")) }}
                    dateFormat="MM/dd/yyyy"
                />

                <label className="addmember-form-label" htmlFor="address">Address<span className="required-field">*</span></label><br />
                <input className="addmember-form-input address-field" value={address} type="text" required onChange={(e) => setAddress(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="email">Email<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="email" value={email} required onChange={(e) => setEmail(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="password">Password<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="password" value={password} required onChange={(e) => setPassword(e.target.value)}></input><br />

                <input className="addmember-submit" type="submit" value="SUBMIT" disabled={isLoading} ></input>
            </form>
            <p className="dashboard-option-title">Recently Added Members</p>
            <div className="dashboard-title-line"></div>
            <table className='admindashboard-table'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Member Type</th>
                        <th>Member ID</th>
                        <th>Member Name</th>
                    </tr>
                </thead>
                <tbody>
                    {recentAddedMembers.map((member, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{member.userType}</td>
                                <td>{member.userType === "Student" ? member.admissionId : member.employeeId}</td>
                                <td>{member.userFullName}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AddMember
