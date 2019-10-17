const { User } = require("../models");
// const JwtService = require("../modules/auth.module");
// const passport = require("passport");
// const bcrypt = require("bcryptjs");

module.exports = {
  async list(req, res) {
    try {
      const { role } = req.user;

      if (role !== "admin") {
        return res
          .status(401)
          .json({ message: "You're not permitted to access this data" });
      }
      const users = await User.findAll({});
      return res.json(200).json({ message: "Users retrieved", users });
    } catch (e) {
      return res.status(400).json({ message: "An error occurred", e });
    }
  },

  async edit(req, res) {
    try {
      const { id } = req.params;
      const details = req.body;

      const reqUser = await User.findOne({ where: { id } });
      if (!reqUser) {
        return res.status(400).json({ message: "invalid selection" });
      }

      if (details.password) {
        if (!reqUser.validPassword(details.password)) {
          return res.status(400).json({
            message: "Incorrect password."
          });
        }
        if (details.password.trim() === "") {
          return res.status(400).json({ message: "invalid password" });
        }
      }

      await User.update(details, {
        where: { id }
      });
      const data = await User.findOne({ where: { id } });

      return res.status(200).json({ message: "user updated", data });
    } catch (e) {
      return res.status(400).json({ message: "An error occurred", e });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const reqUser = await User.findOne({ where: { id } });
      if (!reqUser) {
        return res.status(400).json({ message: "invalid selection" });
      }
      await User.destroy({ where: { id } });

      return res.status(200).json({ message: "user deleted" });
    } catch (e) {
      return res.status(400).json({ message: "An error occurred", e });
    }
  },

  async single(req, res) {
    try {
      const { id } = req.user;

      console.log("id", id);
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return res.status(400).json({ message: "invalid selection" });
      }

      return res.status(200).json({ message: "user retrieved", user });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "An error occurred", e });
    }
  },

  async avatar(req, res) {
    try {
      const { id } = req.user;
      const image = req.file.secure_url;
      await User.update({ image }, { id });
      return res.status(200).json({ message: "avatar added" });
    } catch (e) {
      return res.status(400).json({ message: "An error occurred", e });
    }
  }
};
