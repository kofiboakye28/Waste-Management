import React from 'react';
import '../styles/Profile.css'; // Ensure this CSS file exists

function Profile({ name, profilePicture }) {
  return (
    <div className="profile-container">
      <img src={profilePicture} alt={`${name}'s Profile`} className="profile-picture" />
      <span className="profile-name">{name}</span>
    </div>
  );
}

export default Profile;
