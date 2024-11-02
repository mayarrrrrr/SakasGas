import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from '@mui/material/Alert'; // Import Alert component from MUI
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message
  const [alertType, setAlertType] = useState(""); // State for alert type (success or error)

  const setData = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://bonmaj-backend.onrender.com/userLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("this is the data", data);
        sessionStorage.setItem('id', data.id);
        sessionStorage.setItem("email", data.email);
        localStorage.setItem("access_token", data.access_token);

        // Retrieve role from response data
        const role = data.role;
        console.log("this is the role", role);

        // Set success alert
        setAlertMessage("Login successful");
        setAlertType("success");

        // Redirect based on user role after a short delay
        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin");
          } else {
            navigate("/client");
          }
        }, 1500);
      } else {
        setAlertMessage("Login failed, Invalid credentials");
        setAlertType("error");
      }
    
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("An error occurred while processing your request");
      setAlertType("error");
    }
  };

  return (
    <>
      <section>
        <div className="containerLog">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="glass-form-container">
            <h2>Welcome Back!</h2>
            <p>Login to your account</p>
            
            {/* Conditionally render the alert if alertMessage is set */}
            {alertMessage && (
              <Alert className="top-right-alert" severity={alertType}>
                {alertMessage}
              </Alert>
            )}

            <div className="form-box">
              <form method="POST">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  id="login"
                  name="login"
                  onClick={setData}
                >
                  Login
                </button>
                <br />
                <span className="register-span">New to BONMAJ? </span>
                <NavLink to="/register">Register here</NavLink>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
