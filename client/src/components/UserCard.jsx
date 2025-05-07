import "./UserCard.css";

import { API } from "../utils/api";

function UserCard({ user }) {
  const handleFollow = () => {
    const myId = "your-user-id"; // replace with auth later
    API.post(`/users/${myId}/follow?targetId=${user.id}`);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <img src={user.profilePic} alt={user.name} width={50} />
      <h4>{user.name}</h4>
      <p>{user.email}</p>
      <button onClick={handleFollow}>Follow</button>
    </div>
  );
}

export default UserCard;
