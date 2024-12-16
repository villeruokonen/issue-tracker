const jwt = require('jsonwebtoken');

/**
 * 
 * @param {*} token 
 * @returns True if token valid.
 */
const checkCredentials = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        console.error(err.message);
        return false;
    }
}

module.exports = { checkCredentials };