/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('../utils/jwt')

module.exports = (req, res, next) => {
  const token = req.headers.Authorization
  jwt.verifyToken(token)
  .then(item=>next())
  .catch(err=>res.status(400).json(err))
  
  res.status(401).json({ you: 'shall not pass!' });
};
