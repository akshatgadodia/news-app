const express = require('express')

const router = express.Router()

const {registerUser, loginUser} = require('../controllers/user')

router.post('/sign-up', registerUser)
router.post('/sign-in', loginUser)

module.exports = router