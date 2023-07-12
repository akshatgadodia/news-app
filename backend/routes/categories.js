const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const { getCategories } = require('../controllers/categories')
const verifyUserRoles = require('../middlewares/userRoles')

router.get('/get-all-categories', authentication, verifyUserRoles([1564, 9878]), getCategories);

module.exports = router