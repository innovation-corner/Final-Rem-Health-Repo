const { HMO, User } = require("../models");
const stateCode = require("../Services/stateService");
const messageService = require("../Services/NotificationService");
const moment = require("moment");
const _ = require('lodash');

module.exports = {
  async register(req, res) {
    try {
      const {
        name,
        phonenumber,
        email,
        username,
        password,
        address,
        contactName
      } = req.body;

      if (
        _.isEmpty(name) ||
        _.isEmpty(phonenumber) ||
        _.isEmpty(email) ||
        _.isEmpty(username) ||
        _.isEmpty(password) ||
        _.isEmpty(address) ||
        _.isEmpty(contactName)
      ) {
        return res.status(400).json({ message: "missing fields" });
      }

      const hmoDetails = {
        name,
        phonenumber,
        email,
        address
      };

      const checkUserEmail = await User.findOne({
        where: { email }
      });

      const checkPhone = await User.findOne({
        where: { phonenumber }
      });

      if (checkPhone) {
        return res.status(400).json({ message: "Phonenumber already exists" });
      }

      if (checkUserEmail) {
        return res.status(400).json({ message: "email already exists" });
      }

      const data = {
        name: contactName,
        email,
        username,
        phonenumber,
        password,
        role: "HMO"
      };

      const user = await User.create(data);
      const token = await JwtService.issueToken({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      });

      hosDetails.admin = user.id;
      const hmo = await HMO.create(hmoDetails);

      const responseObj = { user, token, hmo };

      return res
        .status(200)
        .json({ message: "registration successful", responseObj });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "An error occurred", error });
    }
  },

  async addChild(req, res) {
    try {
      const hmo = req.user.id;
      const data = req.body;
      const {
        name,
        email,
        phonenumber,
        state,
        lga,
        dob,
        gender,
        language
      } = data;

      if (
        _.isEmpty(name) ||
        _.isEmpty(phonenumber) ||
        _.isEmpty(email) ||
        _.isEmpty(state) ||
        _.isEmpty(lga) ||
        _.isEmpty(gender) ||
        _.isEmpty(language) ||
        _.isEmpty(dob)
      ) {
        return res.status(400).json({ message: "missing fields" });
      }

      data.hmo = hmo;
      const info = await Info.create(data);

      let { code } = await stateCode.selectCode(info.state);
      let imCode;

      if (info.id < 10) {
        imCode = code + "000" + info.id;
      } else if (info.id >= 10 && info.id < 99) {
        imCode = code + "00" + info.id;
      } else if (info.id >= 100 && info.id < 999) {
        imCode = code + "0" + info.id;
      } else if (info.id >= 1000) {
        imCode = code + info.id;
      }
      info.immunizationCode = imCode;
      const qrCode = await generate(info.immunizationCode);
      console.log(qrCode);
      // info.qrCode = qrCode;
      await info.save();

      const due = moment()
        .subtract(7, "days")
        .startOf("day")
        .toISOString();
      const birthDate = moment(info.dob).toISOString();

      if (birthDate >= due) {
        const date = moment().format("dddd, MMMM Do YYYY");
        const message = await messageService.atBirth(info.language, info, date);

        await sms.sendSms(message, "Remind Me", info.phonenumber);
      }
      const message = await messageService.onRegistration(
        info.language,
        info,
        imCode
      );

      await sms.sendSms(message, "Remind Me", info.phonenumber);

      return res.status(200).json({ message: "Data saved" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "An error occurred", error });
    }
  },

  async edit(req, res) {
    try {
      const data = req.body;
      const { id } = req.params;

      const hmo = await HMO.findOne({ where: { id } });

      if (!hmo) {
        return res.status(400).json({ message: "Invalid id" });
      }

      await HMO.update(data, { where: { id } });
      return res.status(200).json({ message: "updated succesfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "An error occurred", error });
    }
  },

  async view(req, res) {
    try {
      const { id } = req.params;

      const hmo = await HMO.findOne({ where: { id } });

      if (!hmo) {
        return res.status(400).json({ message: "Invalid id" });
      }

      return res.status(200).json({ message: "retrieved succesfully", hmo });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "An error occurred", error });
    }
  },

  async viewAll(req, res) {
    try {
      const hmos = await HMO.findAll({});
      if (!hmos) {
        return res.status(400).json({ message: "No record found" });
      }
      return res.status(200).json({ message: "retrieved succesfully", hmos });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "An error occurred", error });
    }
  }
};
