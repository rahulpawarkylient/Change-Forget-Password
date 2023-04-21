import registerModel from "../models/admin_registerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

/* Login Start */

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await registerModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    // Generate a JWT token
    const token = jwt.sign(
      { user: user.email, id: user._id },
      process.env.JWT_SECRET
    );
    res.status(200).json({ message: "Admin Login Success..", token: token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error while logging in" });
  }
};

/* Login  End */

/* Register Section Start */

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user with the same email already exists
    const user = await registerModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Check if password meets the requirements
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new registerModel({
      name,
      email,
      password: hashedPassword,
      isAdmin: true, // set isAdmin to true for admin user
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* Register Section End */

/* FORGOT PASSWORD START */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user with the email and mobile number exists
    const user = await registerModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new password and hash it
    const newPassword = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10); // Specify the number of rounds of hashing to use
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Generate a random OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });

    // Store the OTP in the database or in-memory cache for future verification
    const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // Set the expiration time to 5 minutes from now
    await registerModel.updateOne({ email }, { otp, otpExpiration });

    // Send the OTP to the user's email address
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "radharaman.ratre@kylient.com", // Enter your email address
        pass: "yxnhhplndeonnygk", // Enter your email password
      },
    });

    const mailOptions = {
      from: "radharaman.ratre@kylient.com", // Enter your email address
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Error while sending OTP" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ message: "OTP sent successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while sending OTP" });
  }
};

/* VERIFY OTP AND RESET PASSWORD */
export const verifyOtpAndResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Check if user with the email exists and the OTP matches
    const user = await registerModel.findOne({ email, otp });
    if (!user) {
      return res.status(404).json({ message: "Invalid OTP" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    await registerModel.updateOne({ email }, { password: hashedPassword });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while resetting password" });
  }
};
/* FORGOT PASSWORD END */

/* CHANGE PASSWORD START */

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // decode the JWT and extract the userId
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  try {
    const user = await registerModel.findById(userId);
    // console.log(user);

    // check if current password is correct
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // hash the new password and update the user
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

/* CHANGE PASSWORD END*/
