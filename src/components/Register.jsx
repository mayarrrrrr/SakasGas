import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert"; // Import Alert component from MUI
import "./register.css";

function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "client"
    });

    const [alertMessage, setAlertMessage] = useState(""); // State for alert message
    const [alertType, setAlertType] = useState(""); // State for alert type (success or error)

    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({ ...user, [name]: value });
    };

    const postData = async (e) => {
        e.preventDefault();

        const { username, email, password, confirmPassword, role } = user;

        // Condition to check if email contains "ayak" when registering as admin
        if (role === "admin" && !email.includes("nicksonchir@gmail.com")) {
            setAlertMessage("Only authenticated persons can register as an admin.");
            setAlertType("error");
            return;
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            setAlertMessage("Passwords do not match");
            setAlertType("error");
            return;
        }

        try {
            const res = await fetch("https://sakasgas-backend.onrender.com/userRegister", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    role
                })
            });

            const data = await res.json();

            if (res.status === 201) {
                localStorage.setItem("access_token", data.access_token);

                // Set success alert
                setAlertMessage("Registration successful");
                setAlertType("success");

                // Redirect to login after a short delay
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                setAlertMessage("Registration failed");
                setAlertType("error");
            }
        } catch (error) {
            console.error("Error:", error);
            setAlertMessage("An error occurred while processing your request");
            setAlertType("error");
        }
    };

    return (
       <div className="bodyReg">
           <div className="container">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="form-container">
                    <h1>Welcome</h1>

                    {/* Conditionally render the alert if alertMessage is set */}
                    {alertMessage && (
                        <Alert className="top-right-alert" severity={alertType}>
                            {alertMessage}
                        </Alert>
                    )}

                    <form method="POST">
                        <div className="form-group">
                            <label htmlFor="username">User Name</label>
                            <input type="text" className="form-control" id="username" name="username" placeholder="Enter Username" value={user.username} onChange={handleInputs} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Enter Email" value={user.email} onChange={handleInputs} />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" value={user.password} onChange={handleInputs}/>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword} onChange={handleInputs}/>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select className="form-control" id="role" name="role" value={user.role} onChange={handleInputs}>
                                <option value="client">Client</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        
                        <span className="register-span">Already Registered? <NavLink to='/login'>Log in</NavLink><br /> <br /></span>
                        <button type="submit" className="btn btn-primary" id="register" name="register" onClick={postData}>Register</button>
                    </form>
                </div>
           </div>
       </div>
    );
}

export default Register;
