import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Forgot() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !otp || !newPassword || !confirmPassword) {
            toast.error("Please enter all fields.");
            return;
        }

        if (!otp) {
            toast.error("Please enter a valid OTP.");
            return;
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            toast.error(
                "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            setIsLoading(true); // set loading state to true
            const response = await axios.post(
                "http://localhost:8080/api/reset-password",
                { email, otp, newPassword }
            );
            if (response.status === 200) {
                console.log("response.data", response.data);
                toast.success("Password Changed Succesfully...")
                // navigate("/");
                setEmail("");
                setOtp("");
                setNewPassword("");
                setConfirmPassword("");
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
                                    <p className="text-center h2 fw-bold mb-1 mx-1 mx-md-2 mt-2">Reset Password</p>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    <input type="email"
                                        id="email"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid Email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">OTP</label>
                                    <input type="otp"
                                        id="otp"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid OTP"
                                        value={otp}
                                        onChange={(event) => setOtp(event.target.value)}
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">New Password</label>
                                    <input type="password"
                                        id="newpassword"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a New Password"
                                        value={newPassword}
                                        onChange={(event) => setNewPassword(event.target.value)}
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Confirm Password</label>
                                    <input type="password"
                                        id="confirmpassword"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a Confirm Password"
                                        value={confirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                    />
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit"
                                        className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                        disabled={isLoading} // disable the button when loading
                                    >
                                        {isLoading ? "Loading..." : "SUBMIT"}
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Reset Password Now -
                                        <Link to="/login"> Login Here </Link></p>
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
