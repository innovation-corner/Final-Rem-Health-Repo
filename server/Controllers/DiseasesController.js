const { DiseasesRecord, Info, User } = require("../models");
const _ = require("lodash");
const { Op } = require("sequelize");

module.exports = {
  async create(req, res) {
    try {
      let data = ({ type, state, lga } = req.body);
      const { id } = req.params;

      if (_.isEmpty(type) || _.isEmpty(state) || _.isEmpty(lga)) {
        return res.status(400).json({ message: "incomplete filelds" });
      }
      const child = await Info.findOne({ where: { immunizationCode: id } });
      if (!child) {
        return res.status(400).json({ message: "Invalid id" });
      }
      data.child = child.id;

      await DiseasesRecord.create(data);

      return res.status(200).json({ message: "record added" });
    } catch (error) {
      console.log(error);
      error = error || error.toString();
      return res.status(400).json({ message: "An error occured", error });
    }
  },

  async viewAll(req, res) {
    try {
      const { role, id } = req.user;
      const user = await User.findOne({ where: { id } });
      let { search } = req.query;
      let criteria = {};
      if (role == "stateAdmin") {
        criteria = { state: user.state };
      }
      if (search) {
        criteria[Op.or] = [
          { type: { [Op.like]: "%" + search + "%" } },
          { state: search },
          { lga: search }
        ];
      }
      const data = await DiseasesRecord.findAll({
        where: criteria,
        include: [{ all: true }]
      });
      if (!data.length) {
        return res.status(400).json({ message: "No data" });
      }
      return res.status(200).json({ message: "records retrieved", data });
    } catch (error) {
      console.log(error);
      error = error || error.toString();
      return res.status(400).json({ message: "An error occured", error });
    }
  },

  async viewSingle(req, res) {
    try {
      const { id } = req.params;

      const record = await DiseasesRecord.findOne({ where: { id } });
      if (!record) {
        return res.status(400).json({ message: "Invalid id" });
      }

      const data = record;
      return res.status(200).json({ message: "records retrieved", data });
    } catch (error) {
      console.log(error);
      error = error || error.toString();
      return res.status(400).json({ message: "An error occured", error });
    }
  },

  async viewDisease(req, res) {
    try {
      const { id } = req.params;

      const record = await DiseasesRecord.findAll({ where: { type: id } });
      if (!record.length) {
        return res.status(400).json({ message: "Invalid name" });
      }

      const data = record;
      return res.status(200).json({ message: "records retrieved", data });
    } catch (error) {
      console.log(error);
      error = error || error.toString();
      return res.status(400).json({ message: "An error occured", error });
    }
  }
};
