import { useState, useEffect } from "react";
import { API } from "../utils/api";

function EditProfileForm({ userId }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePic: "",
  });

  useEffect(() => {
    API.get(`/users/${userId}`).then(res => setUser(res.data));
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/users/${userId}`, user);
    alert("Profile updated!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Profile</h3>
      <label>Name:</label>
      <input type="text" name="name" value={user.name} onChange={handleChange} />

      <label>Email :</label>
      <input type="email" name="email" value={user.email} onChange={handleChange} />

      <label>Profile Picture URL:</label>
      <input type="text" name="profilePic" value={user.profilePic} onChange={handleChange} />

      <button type="submit">Save</button>
    </form>
  );
}

export default EditProfileForm;
