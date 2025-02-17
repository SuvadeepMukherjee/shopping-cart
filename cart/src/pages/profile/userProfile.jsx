import React from "react";
import "./userProfile.css";

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <p>
        <strong>UserId:{user?.userId || "Guest"}</strong>
      </p>

      {/* <button className="logout-btn">Logout</button> */}
    </div>
  );
};

export default UserProfile;
