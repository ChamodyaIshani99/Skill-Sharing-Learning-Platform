import { useEffect, useState } from "react";
import { API } from "../utils/api";
import UserCard from "../components/UserCard";

function UserListPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserListPage;
