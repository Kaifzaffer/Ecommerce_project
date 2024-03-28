import userModel from "../models/userModel.js";
import { HashPassword, ComparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";


// USER REGISTER || POST METHOD

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phoneNO, address, role } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
      return res.send({ message: "All fields are required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send({ message: "User already exists" });
    }
    const hashedPassword = await HashPassword(password);
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      
      
    });
    await user.save();
    res.send({ message: "Registration successful" });
  } catch (error) {
    console.log(error);
    res.send({ message: "Error in registration" });
  }
};

// USER LOGIN || POST METHOD

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({ message: "All fields are required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send({ message: "Invalid credentials" });
    }
    const isMatch = await ComparePassword(password, user.password);
    if (!isMatch) {
      return res.send({ message: "Invalid credentials" });
    }

    const token = await JWT.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "10000d" }); // JWT sign
    res.status(200).send({
      success: true,
      message: "Login successful",
      user:{
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      token
    })

  } catch (error) {
    console.log(error);
    res.send({ message: "Error in login" });
  }
}

export const testController = (req, res) => {
  res.send("Protected Routes");
}