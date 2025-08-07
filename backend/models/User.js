const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },      // User's full name
  email: { type: String, required: true, unique: true },  // Email for login
  password: { type: String, required: true },  // Hashed password
});

// Hash password before saving to DB
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password to stored hashed password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);

/*
Explanation:
- Define User schema with name, email, and password fields.
- Before saving a user, hash their password.
- Provide a method to compare plaintext password with hashed password.
*/ 