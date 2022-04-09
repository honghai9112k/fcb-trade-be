/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

// const passport = require("passport");
const CLIENT_URL = "http://localhost:3000";

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  //  nodemon -w api -w config
  '/': { view: 'pages/homepage' },
  'Post /asset/getlistProfessasset': {
    controller: 'ProfessassetController',
    action: 'getlistProfessasset',
    cors: {
      allowOrigins: ['http://localhost:3000'],
      allowCredentials: false
    }
  },
  'Post /asset/deleteProfessasset': {
    controller: 'ProfessassetController',
    action: 'deleteProfessasset',
    cors: {
      allowOrigins: ['http://localhost:3000'],
      allowCredentials: false
    }
  },
  'POST /asset/getlistassetcode': {
    controller: 'ProfessassetController',
    action: 'getlistassetcode',
    cors: {
      allowOrigins: ['http://localhost:3000'],
      allowCredentials: false
    }
  },
  'POST /asset/mt_professasset': {
    controller: 'ProfessassetController',
    action: 'cudProfessasset',
    cors: {
      allowOrigins: ['http://localhost:3000'],
      allowCredentials: false
    }
  },
  'POST /signin': {
    controller: 'UserController',
    action: 'signIn',
    cors: {
      allowOrigins: ['http://localhost:3000'],
      allowCredentials: false
    }
  },
  'POST /signup': {
    controller: 'UserController',
    action: 'signup',
    cors: {
      allowOrigins: ['http://localhost:3000'],
      allowCredentials: false
    }
  },
  'POST /refresh-token': {
    controller: 'UserController',
    action: 'refreshToken',
    cors: {
      allowOrigins: ['http://localhost:3000'],
      allowCredentials: false
    }
  },
  'POST /logout': {
    controller: 'UserController',
    action: 'logOut',
    cors: {
      allowOrigins: ['http://localhost:3000'],
      allowCredentials: false
    }
  },

// Google login
'POST /api/google-login': {
  controller: 'UserController',
  action: 'googleLogin',
  cors: {
    allowOrigins: ['http://localhost:3000'],
    allowCredentials: false
  }
},





  'GET /auth/login/success': (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        //   cookies: req.cookies
      });
    }
  },

  'GET /auth/login/failed': (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  },

  'GET /auth/logout': (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
  },

  // 'GET auth/google':  passport.authenticate("google", { scope: ["profile"] }) ,
  'GET /auth/google': {
    controller: 'AuthController',
    action: 'google',
    cors: {
      allowOrigins: ['http://localhost:3000'],
      allowCredentials: false
    }
  }, 

  'GET /auth/google/callback':  {
    controller: 'AuthController',
    action: 'callback',
    cors: {
      allowOrigins: ['http://localhost:3000'],
      allowCredentials: false
    }
  }, 










  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
