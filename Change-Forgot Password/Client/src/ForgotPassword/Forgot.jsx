import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function Forgot() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Instead of setError, use toast.error
        if (!email) {
            toast.error("Please enter Email.");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email.");
            return;
        }
        try {
            setIsLoading(true); // set loading state to true
            const response = await axios.post("http://localhost:8080/api/forgot-password", { email });
            if (response.status === 200) {
                console.log("response.data", response.data);
                // toast.success("OTP send Successfully...");
                navigate("/resetpassword")
            } else {
                toast.error("Invalid email");
            }
        } catch (error) {
            toast.error("invalid credentials");
        } finally {
            setIsLoading(false); // reset loading state to false
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
                                    <p className="text-center h2 fw-bold mb-2 mx-1 mx-md-2 mt-2">Forgot Password</p>
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
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit"
                                        className="btn btn-primary btn-lg "
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                        disabled={isLoading} // disable the button when loading
                                    >
                                        {isLoading ? "Loading..." : "GET OTP"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </section >
        </div >

    )
}

export default Forgot
