

// const User = require('../models/User')
const JWT = require("jsonwebtoken")


module.exports = {
    signIn: async (req, res) => {
        const { email, password } = req.body;

        if (email !== 'hai@gmail.com')
            return res.status(403).json({ error: { message: 'Email is already in user.' } })
        if (password !== '123456') {
            return res.status(403).json({ error: { message: 'Password not true.' } })
        }
        // Encode a token
        const accessToken = await jwToken.signAccessToken(email)
        const refreshToken = await jwToken.signRefreshToken(email)
        
        const check = await redis.getValueByKeyRedis('foo'); 
        console.log('check', check)
await redis.addRedis('RefreshToken',refreshToken,10)
        res.setHeader('RefreshToken', refreshToken)
        res.setHeader('Authorization', accessToken)

        return res.status(201).json({ success: true });
    }
};