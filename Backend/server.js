const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Professional = require("./models/Professional");
const Booking = require("./models/Booking");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/HomeBuddy";
const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB (Fix namespace issue)
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Import Models

const Service = require("./models/Service");

// 🔹 User Signup

app.post("/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({ message: "⚠️ All fields are required." });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
  
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "✅ User registered successfully!" });
    } catch (error) {
      res.status(500).json({ message: "❌ Registration failed. Try again." });
    }
  });
  
  ////// 🚀 LOGIN ROUTE 🚀 //////
  
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "⚠️ All fields are required." });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "❌ Invalid email or password." });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch); // Debugging line
  
      if (!isMatch) {
        return res.status(400).json({ message: "❌ Invalid email or password." });
      }
  
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
  
      res.json({ success: true, message: "✅ Login successful!", token, userId: user._id });
    } catch (err) {
      console.error("Login Error:", err);
      res.status(500).json({ message: "❌ Login failed. Please try again." });
    }
  });
  
  
// 🔹 Get all services
app.get("/services", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

app.post("/book-service", async (req, res) => {
    const { userId, serviceId } = req.body;

    console.log("Received booking data:", { userId, serviceId }); // Log the incoming request data
  
    // Check if userId or serviceId is missing
    if (!userId || !serviceId) {
      return res.status(400).json({ success: false, message: "User ID and Service ID are required." });
    }
  
    try {
      // Convert to ObjectId using the 'new' keyword
      const userIdObjectId = new mongoose.Types.ObjectId(userId);
      const serviceIdObjectId = new mongoose.Types.ObjectId(serviceId);
  
      // Create a new booking
      const newBooking = new Booking({
        userId: userIdObjectId,
        serviceId: serviceIdObjectId,
      });
  
      await newBooking.save();
  
      return res.status(200).json({ success: true, message: "Service booked successfully!" });
    } catch (error) {
      console.error("Booking error:", error);
      return res.status(500).json({ success: false, message: "Failed to book service. Please try again later." });
    }
  });

  

  app.post("/register-professional", async (req, res) => {
    try {
      const { name, service, contact } = req.body;
      
      // Validate input
      if (!name || !service || !contact) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newProfessional = new Professional({ name, service, contact });
      await newProfessional.save();
  
      res.status(201).json({ message: "Professional registered successfully!" });
    } catch (error) {
      console.error("Error in Registration:", error);
      res.status(500).json({ error: "Server error. Please try again." });
    }
  });
  
  
  

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
