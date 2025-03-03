const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        // Create token with user data
        const token = jwt.sign(
            { 
                id: user._id,
                name: user.name,
                email: user.email 
            },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );
        
        // Set token in cookie
        res.cookie('token', token, { 
            httpOnly: true,
            maxAge: 3600000 // 1 hour
        });
        
        // Redirect to profile
        res.redirect('/api/profile');
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = login;