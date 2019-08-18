const passport = require("passport");

const authenticator = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (info) {
      return res.status(403).send({error: 'Invalid credentials.'});
    }
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(403).send({error: 'Invalid credentials.'});
    }
    req.login(user, err => {
      if (err) {
        return next(err);
      }
      return res.redirect("/users/me");
    });
  })(req, res, next);
}
module.exports = {
  authenticator,
};
