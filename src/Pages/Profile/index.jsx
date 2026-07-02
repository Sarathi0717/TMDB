import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../Services/FireBase";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <img
          src={user.photo}
          alt={user.name}
          className="profile-image"
        />

        <h1>{user.name}</h1>

        <p>{user.email}</p>

        <div className="profile-info">

          <div className="info-item">
            <span>Name</span>
            <span>{user.name}</span>
          </div>

          <div className="info-item">
            <span>Email</span>
            <span>{user.email}</span>
          </div>

          <div className="info-item">
            <span>User ID</span>
            <span>{user.uid.substring(0, 10)}...</span>
          </div>

          <div className="info-item">
            <span>Status</span>
            <span>🟢 Online</span>
          </div>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
        <button onClick={()=>navigate("/edit-profile")}>Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;