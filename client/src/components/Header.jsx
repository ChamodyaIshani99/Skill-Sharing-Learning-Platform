import { useNavigate } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ background: "#eee", padding: "10px" }}>
      {user && (
        <>
          <img src={user.profilePic} width={40} style={{ borderRadius: "50%" }} />
          <span style={{ marginLeft: "10px" }}>{user.name}</span>
          <button onClick={logout} style={{ float: "right" }}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Header;
