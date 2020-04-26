const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
});

// Create the model class
mongoose.model('user', userSchema);