import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
export const registerUser = async (req, resp) => {
  try {
    const { name, password, email } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return resp.status(409).json({
        stats: "Fail",
        message: `User with email ${email} already exist`,
      });
    }
    await User.create({ name, email, password });
    resp.status(201).json({ status: "Success", message: "User created" });
  } catch (error) {
    resp.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const getUser = async (req, resp) => {
  try {
    const user = await User.findOne();
    if (!user) {
      resp.status(404).json({ status: "not found", message: "No users found" });
    }

    resp.status(202).json({ user });
  } catch (error) {
    resp.status(500).json({ status: "error", error: "Internal server error" });
  }
};

export const loginUser = async (req, resp) => {
  try {
    const { email, password, passwordConfirm } = req.body;

    const user = await User.findOne({ email });
    const isMatch = await user.comparePassword(password);

    if (password !== passwordConfirm) {
      return resp.status(404).json({
        status: "fail",
        message: "Password does not much",
      });
    }
    if (!user) {
      resp.status(404).json({
        status: "fail",
        message: `no user found with email : ${email}`,
      });
    }

    if (!isMatch) {
      return resp.status(400).json({
        status: "fail",
        message: "Wrong credentials, please try again",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    resp.status(200).json({ status: "Success", user, token });
  } catch (error) {
    resp.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};
