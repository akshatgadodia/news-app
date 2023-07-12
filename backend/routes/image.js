const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const { saveImage } = require('../controllers/image')
const verifyUserRoles = require('../middlewares/userRoles')

router.post('/upload-image', authentication, verifyUserRoles([9878]), saveImage);

module.exports = router