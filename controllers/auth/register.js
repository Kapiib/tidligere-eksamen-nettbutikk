const bcrypt = require('bcrypt');
const User = require('../../models/User');

const saltRounds = 10;

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Create user
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        
        // Redirect to login
        res.redirect('/auth/login');
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = register;