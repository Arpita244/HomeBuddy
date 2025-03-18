const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: String, required: true }, // Instead of ObjectId
  bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
