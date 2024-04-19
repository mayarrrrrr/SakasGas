import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setData = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:5555/userLogin", {
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
        localStorage.setItem("access_token", data.access_token);
        window.alert("Login successful");

        // Retrieve role from response data
        const role = data.role;
        console.log("this is the role", role);

        // Check user role and redirect accordingly
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/client");
        }
      } else {
        window.alert("Login failed, Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred while processing your request");
    }
  };

  return (
    <>
      <section>
       <div className="containerLog">
       <div className="glass-form-container">
          <div className="form-box">
            <form method="POST">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your Email"
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
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <NavLink to="/register">No account? register here!</NavLink>
              <br />
              <br />
              <button
                type="submit"
                className="btn btn-primary"
                id="login"
                name="login"
                onClick={setData}
              >
                Login
              </button>
            </form>
          </div>
        </div>
       </div>
      </section>
    </>
  );
}

export default Login;
