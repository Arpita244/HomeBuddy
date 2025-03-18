const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const { checkPassword, encryptPassword } = require("./passencrypt");
require("dotenv").config();

const mongoUrl = process.env.MONGODB_URL;

// User Schema
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Password hashing before saving
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const existingUser = await this.constructor.findOne({ email: this.email });
    if (existingUser) {
      return next(new Error("Email already exists."));
    }
    try {
      this.password = await encryptPassword(this.password);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

userSchema.statics.checkCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await checkPassword(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }
  return user;
};

const User = model("User", userSchema);

// Professional Schema
const professionalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Professional = model("Professional", professionalSchema);

// Booking Schema
const bookingSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Booking = model("Booking", bookingSchema);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

connectDB();

module.exports = { User, Professional, Booking };