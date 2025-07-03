import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import "./MemberDashboard.css";

function MemberDashboard() {
  const { user } = useContext(AuthContext);
  const [memberDetails, setMemberDetails] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/";

  useEffect(() => {
    async function fetchMember() {
      if (!user?._id) return;
      try {
        const res = await axios.get(`${API_URL}api/users/getuser/${user._id}`);
        setMemberDetails(res.data);
      } catch (err) {
        console.error("Failed to fetch member details:", err);
        setError("Failed to load profile details");
      }
    }
    fetchMember();
  }, [user, API_URL]);

  // When user selects a new picture (kept for potential future use, commented out in JSX)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError("Please select an image file");
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  // Upload the picture to backend (kept for potential future use, commented out in JSX)
  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);

    setUploading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${API_URL}api/users/uploadphoto/${user._id}`,
        formData,
        { 
          headers: { 
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (res.status === 200) {
        // Update the memberDetails photo url
        setMemberDetails((prev) => ({ ...prev, photo: res.data.photo }));
        alert("Profile picture updated successfully!");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      if (err.response) {
        setError(err.response.data.message || "Failed to upload image");
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An error occurred while uploading the image.");
      }
    }
    setUploading(false);
  };

  if (!memberDetails) return <div>Loading profile...</div>;

  return (
    <div className="dashboard-option-content"> {/* Keep this outer container for consistent dashboard layout */} 
      <div className="member-profile-container"> {/* Main container for profile sections */} 
        
        {/* Profile Header Section */} 
        <div className="member-profile-header"> 
          <div className="member-profile-cover"></div> {/* Placeholder for cover image/color */} 
          <div className="member-profile-info"> 
            <div className="member-profile-avatar-container"> 
              <img
                className="user-profileimage"
                src={memberDetails.photo ? `${API_URL}${memberDetails.photo.startsWith('/') ? memberDetails.photo.substring(1) : memberDetails.photo}` : "./assets/images/Profile.png"}
                alt={`${memberDetails.userFullName}'s profile`}
              />
              {/* Edit avatar button - commented out */} 
              {/* <button className="edit-avatar-btn" onClick={() => {}}> 
                <EditIcon /> 
              </button> */} 
            </div>
            
            {/* User Basic Info */} 
            <div className="user-info"> 
              <p className="user-name">{memberDetails.userFullName}</p>
              <p className="user-email">{memberDetails.email}</p>
              <p className="user-phone">{memberDetails.mobileNumber}</p>
              {/* Member specific details like Member ID, User Type etc. could go here or in a separate section */} 
              {/* <p>Member ID: {memberDetails.memberId}</p> */} 
              {/* <p>User Type: {memberDetails.userType}</p> */} 
            </div>
          </div>
        </div>

        <div className="member-profile-stats"> 
          {/* Stat cards would go here */} 
          {/* Removed Stats (Placeholder) heading */} 
          {/* <h3>Stats (Placeholder)</h3> */} 
          {/* Example Stat Card structure: */} 
          {/* <div className="stat-card"> 
            <BookIcon className="stat-icon" /> 
            <div className="stat-info"> 
              <h3>Total Books Borrowed</h3> 
              <p>X</p> 
            </div> 
          </div> */} 
        </div>

        <div className="member-profile-details-grid"> 
          {/* Detail cards would go here */} 

          {/* Example Detail Card structure: */} 
          <div className="detail-card"> 
            <h3>Contact Information</h3>
            <div className="detail-item">
              {/* <EmailIcon /> */} 
              <span>Email: {memberDetails.email}</span>
            </div>
            <div className="detail-item">
              {/* <PhoneIcon /> */} 
              <span>Phone: {memberDetails.mobileNumber}</span>
            </div>
            {/* Add other contact details if available */} 
            {/* Removed Address field as requested */}
          </div>

          {/* Additional Detail Cards (Placeholders) */} 
          {/* <div className="detail-card"> 
            <h3>Membership Info</h3> 
            <div className="detail-item"> 
              <span>Member Since: DATE</span> 
            </div> 
          </div> */} 
          
        </div>

        {/* File input and upload section (Removed as per user request, keeping commented out) */} 
        {/* <div style={{ marginTop: 20 }}> 
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            style={{ marginBottom: 10 }} 
          /> 
          <button 
            onClick={handleUpload} 
            disabled={uploading} 
            style={{  
              marginLeft: 10,  
              padding: "6px 14px",  
              cursor: uploading ? "not-allowed" : "pointer", 
              opacity: uploading ? 0.7 : 1 
            }} 
          > 
            {uploading ? "Uploading..." : "Upload Picture"} 
          </button> 
          {error && ( 
            <div style={{  
              color: "#d32f2f",  
              marginTop: 10,  
              fontSize: 14  
            }}> 
              {error} 
            </div> 
          )} 
        </div> */} 

      </div> {/* End of main profile container */} 
    </div> // End of outer dashboard option content
  );
}

export default MemberDashboard;

