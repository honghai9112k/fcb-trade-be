/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

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
  'GET /asset/getlistassetcode': {
    controller: 'ProfessassetController',
    action: 'getlistassetcode',
    cors: {
      allowOrigins: ['http://localhost:3000'],
      allowCredentials: false
    }
  },
  'POST /asset/mt_professasset': {
    controller: 'ProfessassetController',
    action: 'mt_professasset',
    cors: {
      allowOrigins: ['http://localhost:3000'],
      allowCredentials: false
    }
  }

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
