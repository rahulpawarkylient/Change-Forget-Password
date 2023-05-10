import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";

function ChangePassword() {
    const [currentPassword, setcurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            toast.error("Please Enter all fields.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            toast.error("New passwords do not match");
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:7000/api/change-password", {
                currentPassword,
                newPassword,
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response.data);
            setcurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            toast.success("Password changed successfully");
        } catch (error) {
            console.error(error);
            toast.error("Error changing password");
        } finally {
            setIsLoading(false);
        }

    };
    return (
        <>
            <Navbar/>
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
                                    <p className="text-center h3 fw-bold mb-1 mx-1 mx-md-2 mt-2">Change Password</p>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Current Password</label>
                                    <input type="password"
                                        id="currentPassword"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a Current Password"
                                        value={currentPassword}
                                        onChange={(event) => setcurrentPassword(event.target.value)}
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
                                        value={confirmNewPassword}
                                        onChange={(event) => setConfirmNewPassword(event.target.value)}
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
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </section >
        </div >
        </>
    )
}

export default ChangePassword
