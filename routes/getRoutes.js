const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyToken');
const checkAuth = require('../utils/checkAuth');

// Public Routes
router.get('/', checkAuth, (req, res) => {
    res.render('index', { title: 'Home' });
});

router.get('/auth/login', checkAuth, (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('login', { title: 'Login' });
});

router.get('/auth/register', checkAuth, (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('register', { title: 'Register' });
});

// Private Routes
router.get('/api/profile', verifyToken, (req, res) => {
    res.render('profile', { 
        title: 'Profile',
        user: req.user 
    });
});

module.exports = router;