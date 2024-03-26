import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tokens: [{ type: String }] // Array to store bearer tokens
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
