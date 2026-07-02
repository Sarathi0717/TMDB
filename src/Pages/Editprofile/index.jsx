import React, { useState } from "react";
import { auth } from "../../Services/FireBase";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      await updateProfile(auth.currentUser,{
        displayName:name,
        photoURL:photo,
      });

      const oldUser = JSON.parse(localStorage.getItem("user"));

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...oldUser,
          name,
          photo,
        })
      );

      alert("Profile Updated Successfully");

      navigate("/profile");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="edit-profile">
      <div className="edit-card">
        <h1>Edit Profile</h1>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Display Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photo}
            onChange={(e)=>setPhoto(e.target.value)}
          />
          <button>
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditProfile;