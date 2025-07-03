import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../Context/AuthContext';
import './Profile.css';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WorkIcon from '@material-ui/icons/Work';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import BookIcon from '@material-ui/icons/Book';
import PeopleIcon from '@material-ui/icons/People';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

function Profile() {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.userFullName || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');

  const handleSave = () => {
    // Here you would typically make an API call to update the user's information
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user?.userFullName || '');
    setEditedEmail(user?.email || '');
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info">
          <div className="profile-avatar-container">
            <img
              src={user?.photo || "/assets/images/Profile.png"}
              alt="Profile"
              className="profile-avatar"
            />
            {!isEditing && (
              <button className="edit-avatar-btn" onClick={() => setIsEditing(true)}>
                <EditIcon />
              </button>
            )}
          </div>
          <div className="profile-details">
            {isEditing ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="profile-input"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="profile-input"
                  placeholder="Email"
                />
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleSave}>
                    <SaveIcon /> Save
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    <CancelIcon /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="profile-name">{user?.userFullName || "Admin"}</h2>
                <p className="profile-email">
                  <EmailIcon /> {user?.email}
                </p>
                <p className="profile-role">
                  <WorkIcon /> Library Administrator
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="profile-details-grid">
        <div className="detail-card">
          <h3>Contact Information</h3>
          <div className="detail-item">
            <EmailIcon />
            <span>{user?.email}</span>
          </div>
          <div className="detail-item">
            <PhoneIcon />
            <span>+1 234 567 890</span>
          </div>
          <div className="detail-item">
            <LocationOnIcon />
            <span>Library Main Branch, City</span>
          </div>
        </div>

        <div className="detail-card">
          <h3>Work Schedule</h3>
          <div className="detail-item">
            <AccessTimeIcon />
            <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
          </div>
          <div className="detail-item">
            <AccessTimeIcon />
            <span>Saturday: 10:00 AM - 4:00 PM</span>
          </div>
          <div className="detail-item">
            <AccessTimeIcon />
            <span>Sunday: Closed</span>
          </div>
        </div>

        <div className="detail-card">
          <h3>Recent Activity</h3>
          <div className="activity-item">
            <span className="activity-date">Today</span>
            <p>Added 5 new books to the collection</p>
          </div>
          <div className="activity-item">
            <span className="activity-date">Yesterday</span>
            <p>Processed 12 book returns</p>
          </div>
          <div className="activity-item">
            <span className="activity-date">2 days ago</span>
            <p>Updated member records</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 