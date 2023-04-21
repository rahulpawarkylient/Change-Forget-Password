import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Instead of setError, use toast.error
        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email.");
            return;
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
            );
            return;
        }


        try {
            const response = await axios.post("http://localhost:8080/api/login", { email, password });
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                console.log(response.data);
                navigate("/");
            } else {
                toast.error("Invalid email or password.");
            }
        } catch (error) {
            toast.error("invalid credentials");
        }
    };
    return (
        <div className="container-sm">
            <ToastContainer
                position="top-center"
            />
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="..." />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center h2 fw-bold mb-2 mx-1 mx-md-2 mt-4">Sign In</p>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    <input type="email"
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid Email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}

                                    />
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                    <input type="password"
                                        id="form3Example4"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}

                                    />
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link className="fw-bold" to="/forgotPassword">Forgot password? </Link>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Login</button>
                                    <br />
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
                                        <Link to="/register"> Register </Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </section >
        </div >
    )
}

export default Login

