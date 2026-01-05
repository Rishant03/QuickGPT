import User from "../models/user.js"; // make sure file is named User.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// API to register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = generateToken(user._id);
        return res.json({ success: true, token });
      }
    }
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// API to get user data (protect middleware should attach req.user)
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//API to get published images
export const getPublishedImages = async (req, res) => {
    try{
      const publishedImageMessages = await Chat.aggregate([
        {$unwind: "$messages"},
        {
          $match: {
            "messages.isImage": true,
            "messages.isPublished": true
          }
        },
        {
          $project: {
            _id: 0,
            imageUrl: "$messages.content",
            userName: "$userName"
          }
        }
      ])
  
        res.json({ success: true, images: publishedImageMessages.reverse()})
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}