
const isAuthenticated = (req, res, next) => {
  return req.isAuthenticated ? 
    next() :
    res.status(403).send({error: 'You must be authenticated to access this location'});
};

module.exports = {
  isAuthenticated,
};
