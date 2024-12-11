const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// testing "database"
const users = [{ id: 1, username: 'test', password: bcrypt.hashSync('123', 10) }];

const login = (req, res) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // set cookie and send formatted response
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie("authToken", token, { httpOnly: true} )
        .json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                token: token
            }
        })
};

// logout
const logout = (req, res) => {
    res.clearCookie('authToken').json({ message: 'Logged out successfully.' });
};

const getSession = (req, res) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ message: 'Profile data', user: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const checkCredentials = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        console.error(err.message);
        return false;
    }
}

module.exports = { login, logout, getSession, checkCredentials };