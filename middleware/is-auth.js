const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authenToken = req.headers.token;

  if (authenToken) {
    const token = authenToken.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECTECT, (err, user) => {
      if (err) {
        res.status(403).json("Token không đúng. Vui lòng đăng nhập lại!");
      }
      req.user = user;

      next();
    });
  } else {
    return res.status(401).json("Vui lòng đăng nhập!");
  }
};
