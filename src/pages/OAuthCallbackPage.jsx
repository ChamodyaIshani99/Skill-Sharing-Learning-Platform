import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/api";

function OAuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("uid");

    if (!userId) {
      alert("Missing user ID");
      return;
    }

    // Fetch user info from backend
    API.get(`/users/${userId}`).then(res => {
      const user = res.data;

      // Store in localStorage (or context)
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    });
  }, [navigate]);

  return <p>Logging you in... Please wait.</p>;
}

export default OAuthCallbackPage;
