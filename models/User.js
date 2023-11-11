const mongoose = require("mongoose");

const User = mongoose.model('User', {
    name: String,
    email: String,
    age: Number,
    approved: Boolean
}
)

module.exports = User;