'use strict';

const JWT = require('jsonwebtoken');
const createError = require('http-errors')

// Generates a token from supplied payload
const signAccessToken = async (email) => {
  return new Promise((resolve, reject) => {
    const payload = { email }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: '1h' // 10m 10s
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
    return next(createError.Unauthorized());
  }
  const authHeader = req.headers['authorization']
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];

  JWT.verify(
    token, // The token to be verified
    process.env.ACCESS_TOKEN_SECRET, // Same token we used to sign
    (err, payload) => {
      if (err) {
        return next(createError.Unauthorized());
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
      expiresIn: '1y' // 10m 10s
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
module.exports = { signAccessToken, verifyAccessToken, signRefreshToken };