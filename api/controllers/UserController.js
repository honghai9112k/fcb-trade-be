

// const User = require('../models/User')
const JWT = require("jsonwebtoken")
const createError = require('http-errors');

module.exports = {
    signIn: async (req, res) => {

        const { email, password } = req.body;

        if (email !== 'hai@gmail.com')
            return res.json({
                status: 403,
                message: 'Email is already in user.'
            });
        if (password !== '123456') {
            return res.json({
                status: 403,
                message: 'Password not true.'
            });
        }
        // Encode a token
        const accessToken = await jwToken.signAccessToken(email)
        const refreshToken = await jwToken.signRefreshToken(email)

        const check = await redis.getValueByKeyRedis('foo');

        await redis.addRedis(email, refreshToken, (24 * 60 * 60))
        res.setHeader('RefreshToken', refreshToken)
        res.setHeader('Authorization', accessToken)

        return res.json({
            status: 200,
            message: 'Success',
            authorization: accessToken,
            refreshToken: refreshToken,
        });
    },
    refreshToken: async (req, res) => {
        try {
            const { refreshtoken } = req.headers;
            if (!refreshtoken) {
                throw createError.BadRequest();
            }
            const { email } = await jwToken.verifyRefreshToken(refreshtoken)
            const accessToken = await jwToken.signAccessToken(email)
            const refrToken = await jwToken.signRefreshToken(email)
            await redis.addRedis('RefreshToken', refrToken, 10)
            res.json({
                accessToken,
                refrToken
            })
        } catch (err) {
            res.json({
                status: err.status || 500,
                message: err.message
            })
        }
    },
    logOut: async (req, res) => {
        try {
            const { refreshtoken } = req.headers;

            if (!refreshtoken) {
                throw createError.BadRequest();
            }

            const { email } = await jwToken.verifyRefreshToken(refreshtoken);
            const check = redis.deleteRedis(email);
            if (!check) {
                return res.status(400).json({ 'err': 'Delete fail.' });
            }
            res.json({
                status: 200,
                message: 'LogOut!'
            })
        } catch (error) {
            res.json({
                status: err.status || 500,
                message: err.message
            })
        }
    }
};