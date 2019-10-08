const { User } = require("../models");
const JwtService = require("../modules/auth.module");
const passport = require("passport");
const bcrypt = require("bcryptjs");

module.exports = {
  async register(req, res) {
    try {
      const {
        email,
        username,
        phonenumber,
        password,
        role,
        name,
        state
      } = req.body;
      console.log(req.body);

      const checkUserEmail = await User.findOne({
        where: { email }
      });
      const checkUsername = await User.findOne({
        where: { username }
      });

      const checkPhone= await User.findOne({
        where: { phonenumber }
      });

      if (checkPhone) {
        return res.status(400).json({ message: "Phonenumber already exists" });
      }

      if (checkUserEmail) {
        return res.status(400).json({ message: "email already exists" });
      }

      if (checkUsername) {
        return res.status(400).json({ message: "username already exists" });
      }

      const data = {
        email,
        username,
        name,
        password,
        role,
        phonenumber,
        state
      };
      const user = await User.create(data);
      const token = await JwtService.issueToken({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      });

      const responseObj = { user, token };

      return res
        .status(200)
        .json({ message: "registration successful", responseObj });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "An error occured", e });
    }
  },

  async login(req, res) {
    try {
      passport.authenticate("local", async (err, user, info) => {
        if (!user) {
          let message = info ? info.message : "An error occured";
          let data = info ? info.data : err;
          return res.status(401).json({ message, data });
        }

        const token = await JwtService.issueToken({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        });
        const responseObj = { user };
        responseObj.token = token;

        const data = { last_login: new Date() };

        await User.update(data, { where: { id: user.id } });

        return res
          .status(200)
          .json({ message: "login successful", responseObj });
      })(req, res);
    } catch (err) {
      return res.status(401).json({ message: "An error occured", err });
    }
  },

  // for when we get a mail service and are able to send an email
  async resetLink(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({
        email
      });

      if (!user) {
        return res.status(400).json({ message: "invailid user" });
      }

      const generateCode = (length, chars) => {
        if (!chars) {
          chars = "0123456789abcdefghijklmnopqrstuvwxyz";
        }
        let result = "";
        for (let i = length; i > 0; --i) {
          result += chars[Math.round(Math.random() * (chars.length - 1))];
        }
        return result;
      };

      const verificationCode = await generateCode(11);

      const emailData = { email, verificationCode };
      await User.update({ verificationCode }, { where: { email } });

      await Email.sendResetEmail(emailData);

      return res.status(200).json({ message: "reset email sent" });
    } catch (error) {
      return res.status(401).json({ message: "An error occured", err });
    }
  },

  async verifyCode(req, res) {
    try {
      const verificationCode = req.params.id;

      const user = await User.findOne({ where: verificationCode });

      if (!user) {
        return res.status(400).json({ message: "invailid code" });
      }

      return res.status(200).json({ message: "valid code", user });
    } catch (error) {
      return res.status(400).json({ message: "An error occured" });
    }
  },

  async resetPassword(req, res) {
    try {
      const data = req.body;
      const { id } = req.params;

      const user = await User.findOne({
        verificationCode: id
      });
      if (!user) {
        return false;
      }

      if (data.password) {
        if (data.password.trim() !== "") {
          const hash = bcrypt.hashSync(data.password, 8);
          data.password = hash;
        } else {
          return false;
        }
      }

      await User.update(
        {
          id: req.user.id
        },
        data
      );

      return res
        .status(200)
        .json({ message: "Password reset successfully", user });
    } catch (e) {
      return res.status(400).json({ message: "An error occured" });
    }
  }
};
