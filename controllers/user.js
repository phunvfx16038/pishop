const User = require("../models/user");
const bscrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
exports.getUsers = (req, res, next) => {
  if (req.user.isAdmin) {
    User.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => res.status(404).json(err));
  } else {
    res.status(403).json("Bạn không có quyền truy cập trang này!");
  }
};

exports.getUser = (req, res, next) => {
  if (req.params.id === req.user._id || req.user.isAdmin) {
    User.findById(req.params.id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => res.status(404).json(err));
  } else {
    res.status(403).json("Bạn không có quyền truy cập trang này!");
  }
};

exports.postUpdateUser = (req, res, next) => {
  const userName = req.body.userName;
  const image = req.body.image;
  const phone = req.body.phone;
  const address = req.body.address;
  const id = req.params.id;
  const email = req.body.email;
  const adminRole = req.body.isAdmin;
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    return res.status(400).json({ message: result.array()[0].msg });
  }

  if (req.user.isAdmin || id === req.user._id) {
    User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => res.status(404).json(err));
  } else {
    return res.status(403).json("Bạn không có quyền cập nhật!");
  }
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      if (!user.isAdmin) {
        if (req.user.isAdmin) {
          User.findByIdAndDelete(id)
            .then((result) => {
              return res.status(200).json("User đã được xóa!");
            })
            .catch((err) => res.status(404).json(err));
        } else {
          return res.status(403).json("Bạn không có quyền xóa tài khoản!");
        }
      } else {
        return res.status(500).json("Không thể xóa tài khoản admin!");
      }
    })
    .catch((err) => res.status(404).json(err));
};

exports.deleteUsers = (req, res, next) => {
  const userIdList = req.body.idList;
  const isAdmin = req.body.isAdmin;
  if (!isAdmin) {
    return res.status(401).json("Bạn không có quyền xóa user này!");
  }
  User.find({ _id: { $in: userIdList } }).then((users) => {
    const nonAdmin = users.filter((user) => {
      return user.isAdmin === false;
    });
    const listUserDelete = nonAdmin.map((user) => user._id.toString());
    User.deleteMany({ _id: { $in: listUserDelete } })
      .then((result) => {
        return res.status(200).json("User đã được xóa!");
      })
      .catch((err) => res.status(404).json(err));
  });
};
