const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const crypto = require("crypto");
const dotenv = require("dotenv");
const { validationResult } = require("express-validator");

dotenv.config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2CLient = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2CLient.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (emailUser, token) => {
  try {
    const accessToken = await oAuth2CLient.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "phunvfx16038@funix.edu.vn",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    let infor = await transport.sendMail({
      from: "phunvfx16038@funix.edu.vn",
      to: emailUser,
      subject: "Password Reset",
      html: `
      <p>You requested a reset password</p>
      <p>Click this <a href='http://localhost:3000/reset/${token}'>link</a> to set new password</p>
    `,
    });
    console.log("success!");
  } catch (err) {
    console.log(err);
  }
};
exports.postLogin = (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    return res.status(400).json({ message: result.array()[0].msg });
  }
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
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    return res.status(400).json({ message: result.array()[0].msg });
  }
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

exports.postResetPassword = (req, res) => {
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    return res.status(400).json({ message: result.array()[0].msg });
  }
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return res.status(500).json(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(403).json("Email không tồn tại!");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        sendMail(req.body.email, token);
      });
  });
};

exports.postUpdateResetPassword = (req, res) => {
  const newPassword = req.body.password;
  const token = req.body.token;
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    return res.status(400).json({ message: result.array()[0].msg });
  }
  let resetUser;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashPassword) => {
      resetUser.password = hashPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => console.log(err));
};

exports.UpdateUserPassword = (req, res) => {
  const { adminId, userId, password } = req.body;
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    return res.status(400).json({ message: result.array()[0].msg });
  }
  let resetUser;
  User.findOne({ _id: adminId })
    .then((userAdmin) => {
      if (!userAdmin.isAdmin) {
        return res.status(403).json("Bạn không có quyền cập nhật!");
      }
      User.findOne({ _id: userId })
        .then((user) => {
          resetUser = user;
          return bcrypt.hash(password, 12);
        })
        .then((hashPassword) => {
          resetUser.password = hashPassword;
          return resetUser.save();
        })
        .then((user) => {
          return res.status(200).json(user);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
