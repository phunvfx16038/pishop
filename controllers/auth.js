const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postLogin = (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;

  User.findOne({ userName: userName })
    .then((user) => {
      if (!user) {
        res
          .status(403)
          .json({ error: "Tài khoản không tồn tại. Vui lòng kiểm tra lại!" });
      }
      bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          req.isLoggedIn = true;
          req.user = user;
          const accessToken = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.JWT_SECTECT,
            { expiresIn: "1d" }
          );
          const { password, ...info } = user._doc;
          res.status(200).json({ ...info, accessToken });
        } else {
          res
            .status(401)
            .json({ error: "Mật khẩu không đúng.Vui lòng nhập lại!" });
        }
      });
    })
    .catch((err) => res.status(404).json(err));
};

exports.postRegister = (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const image = req.body.image;
  const phone = req.body.phone;
  const email = req.body.email;
  const address = req.body.address;
  const adminRole = req.body.isAdmin;

  User.find({ userName: userName })
    .then((users) => {
      if (users.length !== 0) {
        return res
          .status(403)
          .json({ error: "UserName đã tồn tại.Vui lòng chọn tên khác!" });
      }
      return bcrypt
        .hash(password, 12)
        .then((hashPassword) => {
          const user = new User({
            userName: userName,
            password: hashPassword,
            image: image,
            phone: phone,
            address: address,
            isAdmin: adminRole,
            email: email,
          });
          return user.save();
        })
        .then((user) => {
          const { password, ...register } = user._doc;
          return res.status(201).json(register);
        })
        .catch((err) => res.status(404).json(err));
    })
    .catch((err) => res.status(404).json(err));
};
