const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const { addPreferences, getUserPreferences } = require('../controllers/userPreferences');
const verifyUserRoles = require('../middlewares/userRoles');

router.put('/add-preference', authentication, verifyUserRoles([1564, 9878]), addPreferences);
router.get('/get-user-preference', authentication, verifyUserRoles([1564, 9878]), getUserPreferences);

module.exports = router