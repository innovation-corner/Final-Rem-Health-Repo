const { Info, User, ImmunizationRecord } = require("../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const stateCode = require("../Services/stateService");
const messageService = require("../Services/NotificationService");
const moment = require("moment");
const { generate } = require("../Services/QrCodeService");

module.exports = {
  async create(req, res) {
    try {
      const { type } = req.body;
      const { id } = req.user;
      const childId = req.params.id;

      const data = {
        type,
        administeredBy: id,
        child: childId
      };

      if (_.isEmpty(type)) {
        return res.status(400).json({ message: "Incomplete parameters" });
      }

      await ImmunizationRecord.create(data);

      return res.status(200).json({ message: "saved" });
    } catch (e) {
      e = e || e.toString()
      return res.status(400).json({ message: "An error occurred", e });
    }
  },

  async getChildImmunization(req, res) {
    try {
      const { id } = req.params;
      const child = await Info.findOne({ where: { id } });

      if (!child) {
        return res.status(400).json({ message: "Invalid id" });
      }

      const records = await ImmunizationRecord.findAll({
        where: { child: id }
      });
      if (!records.length) {
        return res.status(400).json({ message: "No records found" });
      }
      const data = records;
      return res.status(200).json({ message: "Data retrieved", data });
    } catch (e) {
      console.log(e);
      e = e || e.toString();
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

      await ImmunizationRecord.update(update, { where: { id } });

      data = await ImmunizationRecord.findOne({ where: { id } });

      return res.status(200).json({ message: "Data updated", data });
    } catch (e) {
      return res
        .status(400)
        .json({ message: "An error occurred", e: e.toString() });
    }
  }

  // async create(req, res) {
  //   try {
  //     const data = req.body;
  //     const info = await Info.create(data);

  //     let { code } = await stateCode.selectCode(info.state);
  //     let imCode;

  //     if (info.id < 10) {
  //       imCode = code + "000" + info.id;
  //     } else if (info.id >= 10 && info.id < 99) {
  //       imCode = code + "00" + info.id;
  //     } else if (info.id >= 100 && info.id < 999) {
  //       imCode = code + "0" + info.id;
  //     } else if (info.id >= 1000) {
  //       imCode = code + info.id;
  //     }
  //     info.immunizationCode = imCode;
  //     const qrCode = await generate(info.immunizationCode);
  //     console.log(qrCode);
  //     // info.qrCode = qrCode;
  //     await info.save();

  //     const due = moment()
  //       .subtract(7, "days")
  //       .startOf("day")
  //       .toISOString();
  //     const birthDate = moment(info.dob).toISOString();

  //     if (birthDate >= due) {
  //       const date = moment().format("dddd, MMMM Do YYYY");
  //       const message = await messageService.atBirth(info.language, info, date);

  //       await sms.sendSms(message, "Remind Me", info.phonenumber);
  //     }
  //     const message = await messageService.onRegistration(
  //       info.language,
  //       info,
  //       imCode
  //     );

  //     await sms.sendSms(message, "Remind Me", info.phonenumber);

  //     return res.status(200).json({ message: "Data saved" });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).json({ message: "An error occurred", e });
  //   }
  // }
};
