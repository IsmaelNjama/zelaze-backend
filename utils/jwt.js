const jwt = require('jsonwebtoken');
const sercetKey = process.env.JWT_SECRET_KEY; 

module.exports = {
    sign: (payload) => {
        const accessToken = jwt.sign(payload, sercetKey, { expiresIn: '300d' });
        return {
            accessToken
        }
    },
    verify: (token) => {
        const payload = jwt.verify(token, sercetKey);
        return payload;
    }
}