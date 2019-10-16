const { Info, User } = require("../models");
const { Op } = require("sequelize");
const stateCode = require("../Services/stateService");
const messageService = require("../Services/NotificationService");
const moment = require("moment");
const { generate } = require("../Services/QrCodeService");
const _ = require('lodash')

module.exports = {
  async getTotalCount(req, res) {
    const data = await Info.findAndCountAll({});

    return res.json({ message: "Data retrieved", data });
  },

  async list(req, res) {
    try {
      let criteria = {};
      const { search, dateFrom, dateTo } = req.query;
      const { id } = req.user;
      const user = await User.findOne({ where: { id } });
      let data;

      if (user.role !== "superAdmin" && user.role !== "nationalAdmin") {
        criteria = { state: user.state };
      }

      if (user.role == "HMO") {
        creiteria = { hmo: id };
      }

      if (search) {
        criteria[Op.or] = [
          { name: { [Op.like]: "%" + search + "%" } },
          { phonenumber: search },
          { createdAt: search },
          { dob: search },
          { state: search },
          { lga: search },
          { language: search },
          { gender: search },
          { immunizationCode: search },
          { qrCode: search }
        ];
      }

      if (dateFrom || dateTo) {
        criteria.createdAt = { [Op.between]: [dateFrom, dateTo] };
      }

      data = await Info.findAndCountAll({ where: criteria });

      if (!data.rows.length) {
        return res.status(401).json({ message: "No data" });
      }

      return res.status(200).json({ message: "Data retrieved", data });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "An error occurred", e });
    }
  },

  async getByAge(req, res) {
    try {
      const { dateFrom, dateTo } = req.query;
      let criteria = {};
      const user = await User.findOne({ where: { id: req.user.id } });

      if (user.role !== "superAdmin" && user.role !== "nationalAdmin") {
        criteria = { state: user.state };
      }

      criteria.dob = { [Op.between]: [dateFrom, dateTo] };

      const data = await Info.findAll({ where: criteria });

      if (!data.length) {
        return res.status(401).json({ message: "No data" });
      }

      return res.json({ message: "Data retrieved", data });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "An error occurred", e });
    }
  },

  async listSingle(req, res) {
    try {
      const { id } = req.params;

      const data = await Info.findOne({ where: { id } });
      console.log(data);

      if (!data) {
        console.log("see!!");
        return res.status(400).json({ message: "Data does not exist" });
      }

      return res.status(200).json({ message: "Data retrieved", data });
    } catch (e) {
      return res.status(400).send({ message: "An error occurred", e });
    }
  },

  async editSingle(req, res) {
    try {
      const { id } = req.params;
      const update = req.body;
      let data;

      const reqData = await Info.findOne({ where: { id } });

      if (!reqData) {
        return res.status(400).json({ message: "Data does not exist" });
      }

      if (update.state && update.state != reqData.state) {
        const { code } = await stateCode.selectCode(update.state);

        let imCode;
        if (update.id < 10) {
          imCode = code + "000" + update.id;
        } else if (update.id >= 10 && update.id < 99) {
          imCode = code + "00" + update.id;
        } else if (update.id >= 100 && update.id < 999) {
          imCode = code + "0" + update.id;
        } else if (info.id >= 1000) {
          imCode = code + update.id;
        }
        update.immunizationCode = imCode;
        await update.save();
      }

      await Info.update(update, { where: { id } });

      data = await Info.findOne({ where: { id } });

      return res.status(200).json({ message: "Data updated", data });
    } catch (e) {
      return res
        .status(400)
        .json({ message: "An error occurred", e: e.toString() });
    }
  },

  async create(req, res) {
    try {
      const data = ({
        name,
        phonenumber,
        dob,
        state,
        lga,
        language,
        gender
      } = req.body);
      if(_.isEmpty(name) ||
      _.isEmpty(phonenumber) ||
      _.isEmpty(dob) ||
      _.isEmpty(state) ||
      _.isEmpty(lga) ||
      _.isEmpty(gender) ||
      _.isEmpty(language)
      ){
        return res.status(400).json({message:'Incomplete fields'})
      }

      const info = await Info.create(data);

      if (req.user.role == "HMO") {
        info.hmo = req.user.id;
      }

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
      return res.status(400).json({ message: "An error occurred", e });
    }
  }
};
