const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("access denied no toekn provided");
  else {
    try {
      const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send("Invlaid token");
    }
  }
};
