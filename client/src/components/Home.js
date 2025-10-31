import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/login/success", {
          withCredentials: true,
        });
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.log("User not logged in:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  const handleGoToSearch = () => navigate("/home");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>MERN OAuth Image Search</h1>

      {user ? (
        <>
          <h3>Welcome, {user.displayName}</h3>
          <img
            src={user.photos?.[0]?.value}
            alt="Profile"
            style={{ width: "100px", borderRadius: "50%" }}
          />
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleGoToSearch}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Go to Image Search
            </button>
          </div>
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={handleLogout}
              style={{
                padding: "10px 20px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <a href="http://localhost:5000/auth/google">
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#4285F4",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Login with Google
          </button>
        </a>
      )}
    </div>
  );
}

export default Home;
