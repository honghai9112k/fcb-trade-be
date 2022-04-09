
module.exports = (req, res, next) => {
  // let token;
  // console.log(req.headers);
  // if (req.headers && req.headers.token) {
  //   token = req.headers.token;
  //   if (token.length <= 0) return res.status(401).json({ err: 'Format is Authorization: Bearer [token]' });

  // } else if (req.param('token')) {
  //   token = req.param('token');
  //   // We delete the token from param to not mess with blueprints
  //   delete req.query.token;
  // } else {
  //   return res.status(401).json({ err: 'No Authorization header was found' });
  // }

  // jwToken.verifyAccessToken(token, function (err, token) {
  //   console.log(token);
  //   if (err) return res.status(401).json({ err: 'Invalid Token!' });
  //   req.token = token; // This is the decrypted token or the payload you provided
  //   next();
  // });

jwToken.verifyAccessToken(req, res, next);

};