const mongoose = require("mongoose");

const professionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  service: { type: String, required: true },
  contact: { type: String, required: true },
});

const Professional = mongoose.model("Professional", professionalSchema);
module.exports = Professional;
