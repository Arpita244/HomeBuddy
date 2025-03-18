const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: Number,
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assuming a provider exists
});

module.exports = mongoose.model("Service", serviceSchema);
