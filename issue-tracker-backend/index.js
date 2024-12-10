const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = 5000;

const JWT_SECRET = process.env.JWT_SECRET;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// testing "database"
const users = [{ id: 1, username: 'test', password: bcrypt.hashSync('123', 10) }];

app.get('/', (req, res) =>
{
    res.send('<h1>API</h1>')
});

// Login route
app.post('/login', (req, res) => {
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
});

// profile fetch
app.get('/profile', (req, res) => {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ message: 'Profile data', user: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

// logout
app.post('/logout', (req, res) => {
    res.clearCookie('authToken').json({ message: 'Logged out successfully.' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
