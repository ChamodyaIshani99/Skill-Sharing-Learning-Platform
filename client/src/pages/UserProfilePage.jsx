import { useEffect, useState } from "react";
import { API } from "../utils/api";
import "../App.css";

function UserProfilePage() {
  const userId = "680bdc64212e66568696a8a0"; // replace with real ID
  const [user, setUser] = useState({});

  useEffect(() => {
    API.get(`/users/${userId}`).then(res => setUser(res.data));
  }, []);

  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      <img src={user.profilePic} alt="pic" width={100} />
      <p>Email: {user.email}</p>
      <p>Followers: {user.followers?.length}</p>
      <p>Following: {user.following?.length}</p>
    </div>
  );
}

export default UserProfilePage;
