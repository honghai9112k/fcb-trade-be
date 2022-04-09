const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "204722963832-8liiqbolck5p1jfi7ksnjv9a880uk8t5.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID);
var util = require('util');

// const User = require('../models/User')
const JWT = require("jsonwebtoken")
const createError = require('http-errors');
var keys = {
    // token: 'tokens:%s',
    client: 'clients:%s',
    // refreshToken: 'refresh_tokens:%s',
    // grantTypes: 'clients:%s:grant_types',
    // user: 'users:%s'

};
module.exports = {
    signIn: async (req, res) => {

        const { email, password } = req.body;
        // console.log( req.body);
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

        // const check = await redis.getValueByKeyRedis('foo');

        await redis.addStringRedis(email, refreshToken, (24 * 60 * 60))
        res.setHeader('RefreshToken', refreshToken)
        res.setHeader('Authorization', accessToken)

        return res.json({
            status: 200,
            message: 'Success. Đăng nhập thành công.',
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
            await redis.addStringRedis('RefreshToken', refrToken, 10)
            res.json({
                status: 200,
                authorization: accessToken,
                refreshToken: refrToken,
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
                status: error.status || 500,
                message: error.message
            })
        }
    },
    googleLogin: async (req, res) => {
        try {
            const token = req.body.tokenId;
            let profileObj = {};
            async function verify() {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: CLIENT_ID,
                });
                const payload = ticket.getPayload();
                const userid = payload['sub'];
                await redis.addAllHashRedis(util.format(keys.client, userid), payload, 24*60*60*60)
                const data = await redis.getClientHashRedis('118109049223155766787')
                console.log('data',data);
                // const obj = JSON.parse(await redis.getValueByKeyRedis('profileObj'))
                // console.log(obj.email);
            }
            verify();
            return res.json({
                status: 200,
                message: 'Success!'
            })
        } catch (error) {
            res.json({
                status: error.status || 500,
                message: error.message
            })
        }
    }
};