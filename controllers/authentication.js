const mongoose = require('mongoose');
const User = mongoose.model('user');

exports.signup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide both email and password' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }
        const user = await new User({ email, password }).save();
        res.json({ success: true });
    } catch(err) {
        return next(err)
    }
}