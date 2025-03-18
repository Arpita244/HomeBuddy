const bcrypt = require("bcryptjs");

// Encrypt password before storing in DB
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare entered password with hashed password in DB
const checkPassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

module.exports = { encryptPassword, checkPassword };