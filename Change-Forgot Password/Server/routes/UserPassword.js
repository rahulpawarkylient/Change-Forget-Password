import express from "express";
import {
  changePassword,
  forgotPassword,
  login,
  register,
  verifyOtpAndResetPassword,
} from "../controllers/UserPassword.js";

const router = express.Router();

//Register me api
router.post("/register", register);

//Login me api
router.post("/login", login);

// Forgot API
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", verifyOtpAndResetPassword);

// Change Password
router.post("/change-password", changePassword);

export default router;
