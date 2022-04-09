'use strict';

const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const { addStringRedis } = require('./redis');

// Generates a token from supplied payload
const signAccessToken = async (email) => {
  return new Promise((resolve, reject) => {
    const payload = { email }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: '10m' // 10m 10s
    }
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    })
  })
  // return JWT.sign({
  //   iss: 'HongHai',
  //   sub: payload,
  //   iat: new Date().getTime(),
  //   exp: new Date().setMinutes(new Date().getMinutes() + 30)
  // }, tokenSecret);
}

// Verifies token on a request
const verifyAccessToken = async (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.json({
      status: 500,
      message: 'Bạn chưa đăng nhập.[Unauthorized]'
    })
  }

  const authHeader = req.headers['authorization']
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  
  JWT.verify(
    token, // The token to be verified
    process.env.ACCESS_TOKEN_SECRET, // Same token we used to sign
    (err, payload) => {
      if (err) {
        if (err.name === 'JsonWebTokenError') {
          // return next(createError.Unauthorized());
          var err = createError.Unauthorized()
          res.json({
            status: err.status || 500,
            message: err.message
          })
        }
        // return next(createError.Unauthorized(err.message));
        res.json({
          status: err.status || 500,
          message: err.message
        })
      }
      req.payload = payload;
      next();
    }
  );
}

// Refresh Token
const signRefreshToken = async (email) => {
  return new Promise((resolve, reject) => {
    const payload = { email }
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: '1d' // 10m 10s
    }
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    })
  })
}

const verifyRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
      if (err) {
        return reject(err);
      }
      if (payload.email) { // check name token in rediss === email and compare vs refreshToken headers
        const reply = await redis.getValueByKeyRedis(payload.email);

        if (reply) {
          return resolve(payload)
        }
        return reject(createError.Unauthorized());
      }
      return reject(createError.InternalServerError());

    })
  })

}
module.exports = { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken };