const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

// Define the model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
});

// On save hook, encrypt password
userSchema.pre('save', async function save(next) {
    const user = this;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return next();
    } catch(err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

// Create the model class
mongoose.model('user', userSchema);