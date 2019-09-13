const { Info } = require("../models");
const { User } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  async list(req, res) {
    try {
      let criteria = {};
      const { search, perPage, currentPage } = req.query;
      const { id } = req.user;
      const user = await User.findOne({ where: { id } });

      if (user.role !== "superAdmin" && user.role !== "nationalAdmin") {
        criteria = { state: user.state };
      }

      if (search) {
        criteria[Op.or] = [
          { name: { [Op.like]: "%" + search + "%" } },
          { phonenumber: search },
          { createdAt: search },
          { dob: search },
          { language: search },
          { gender: search },
          { immunizationCode: search }
        ];
      }

      const offset = currentPage * perPage || 0;
      const data = await Info.findAndCountAll({
        where: criteria,
        limit: perPage,
        offset
      });

      if (!data.rows.length) {
        return res.status(400).json({ message: "No data" });
      }

      return res.json({ message: "Data retrieved", data });
    } catch (e) {
      return res.status(400).json({ message: "An error occurred", e });
    }
  },

  async listSingle(req, res) {
    try {
      const { id } = req.params;

      const data = await Info.findOne({ where: { id } });
      console.log(data)

      if (!data) {
        console.log('see!!')
        return res.status(400).json({ message: "Data does not exist"});
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

      const reqData = await Info.findOne({ where: { id } });

      if (!reqData) {
        return res.status(400).json({ message: "Data does not exist"});
      }

      await Info.update(update, { where: { id } });

      const data = await Info.findOne({ where: { id } });

      return res.status(200).json({ message: "Data updated", data });
    } catch (e) {
      return res.status(400).json({ message: "An error occurred", e });
    }
  }
};
