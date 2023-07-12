const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const { getNewsByCategories, searchNews, getPreferredNews, addNews, getAllNews } = require('../controllers/news')
const verifyUserRoles = require('../middlewares/userRoles')

router.get('/get-news', authentication, verifyUserRoles([1564, 9878]), getNewsByCategories);
router.get('/search-news', authentication, verifyUserRoles([1564, 9878]), searchNews);
router.get('/get-preferred-news', authentication, verifyUserRoles([1564, 9878]), getPreferredNews);
router.post('/add-news', authentication, verifyUserRoles([9878]), addNews)
router.get('/get-all-news', authentication, verifyUserRoles([1564, 9878]), getAllNews)

module.exports = router