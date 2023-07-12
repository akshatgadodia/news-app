const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const { addSubscription, userSubscriptionStatus } = require('../controllers/subscription');
const verifyUserRoles = require('../middlewares/userRoles');

router.post('/add-subscription', authentication, verifyUserRoles([1564, 9878]), addSubscription);
router.get('/get-user-subscription-status', authentication, verifyUserRoles([1564, 9878]), userSubscriptionStatus);

module.exports = router