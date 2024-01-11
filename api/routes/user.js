const express = require('express')

const router = express.Router()

const {
    login,
    register,
    signup,
    getAll,
    signin
} = require('../controller/user')

// router.get('/', login)
// router.post('/', register)

// router.get('/', getAll)
router.post('/', signup)
router.get('/', signin)

module.exports = router