const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        match:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    },
    password: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('User', userSchema)