const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  var auth = "";
  if (req.method == "POST") {
    auth = req.body.headers.authorization;
  } else {
    auth = req.headers.authorization;
  }

  if (!auth) return res.sendStatus(401);
  const token = auth.split(" ")[1];
  const secretKey = req.app.locals.secretKey;
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // Invalid token
      }
      req.user = decoded; // Attach the decoded payload to the request object
      next(); // Token is valid, proceed to the next middleware or route
    });
  } else {
    res.sendStatus(401); // No token provided
  }
};

module.exports = authenticateToken;
