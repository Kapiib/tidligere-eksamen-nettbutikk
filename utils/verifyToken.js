const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/auth/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.clearCookie('token');
        res.redirect('/auth/login');
    }
};

module.exports = verifyToken;