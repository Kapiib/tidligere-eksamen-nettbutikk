const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            res.locals.user = decoded;
        } catch (error) {
            res.clearCookie('token');
            req.user = null;
            res.locals.user = null;
        }
    } else {
        req.user = null;
        res.locals.user = null;
    }
    
    next();
};

module.exports = checkAuth;