import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
const authentication = async (req, resp, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
      return resp.status(401).json({
        status: "fail",
        message: "no token provided, please login again!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne(decoded.userId);

    if (!user) {
      resp.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    resp.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};
export default authentication;
