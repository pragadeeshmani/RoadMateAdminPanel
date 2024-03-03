// routes/auth.js

const express = require('express');
const { getUserlogin, userSignup } = require('../controller/usersController');
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.route('/signup')
    .post(userSignup);

router.get('/login', (req, res) => {
    res.render('login');
});

router.route('/login')
    .post(getUserlogin);

module.exports = router;
