const { Vaccine, ImmunizationRecord, Info } = require("../models");
const _ = require("lodash");

module.exports = {
  async create(req, res) {
    try {
      const { name } = req.body;
      if (_.isEmpty(name)) {
        return res.status(400).json({ message: "incomplete parameters" });
      }
      const vaccine = await Vaccine.findOne({ where: { name } });

      if (vaccine) {
        return res.status(400).json({ message: "name already exists" });
      }

      await Vaccine.create({ name });
      return res.status(200).json({ message: "vaccine saved" });
    } catch (e) {
      return res
        .status(400)
        .json({ message: "An error occured", e: e.tostring() });
    }
  },

  async retrieve(req, res) {
    try {
      const vaccines = await Vaccine.findAll({ where: {} });
      return res.status(200).json({ message: "vaccines retrieved", vaccines });
    } catch (e) {
      return res
        .status(400)
        .json({ message: "An error occured", e: e.tostring() });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const vaccine = await Vaccine.findOne({ where: { id } });

      if (!vaccine) {
        return res.status(400).json({ message: "invalid id" });
      }

      await vaccine.destroy();
      return res.status(200).json({ message: "vaccine deleted" });
    } catch (e) {
      return res
        .status(400)
        .json({ message: "An error occured", e: e.tostring() });
    }
  },

  async vaccinedetails(req, res) {
    try {
      const { name } = req.params;
      let criteria = { type: name };

      if (req.user.role == "stateAdmin") {
        criteria.state = user.state;
      }

      if (req.user.role == "HMO") {
        criteria.hmo = id;
      }

      if (req.user.role == "hospitalAdmin") {
        const hospital = await Hospital.findOne({
          where: { admin: req.user.id }
        });

        criteria.hospitalCode = hospital.code;
      }

      const record = await ImmunizationRecord.findAll({
        where: criteria,
        include: [{ all: true }]
      });

      return res.status(200).json({ message: "vaccines retrieved", record });
    } catch (e) {
      return res
        .status(400)
        .json({ message: "An error occured", e: e.tostring() });
    }
  }
};
