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

  async viewChildDiseases(req, res) {
    try {
      const { id } = req.params;

      const record = await DiseasesRecord.findAll({ where: {child: id } });
      if (!record.length) {
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
  },

  async complexSearch(req, res) {
    try {
      const { values } = req.body;
      const {id} = req.params;
      let criteria = {};
      const user = await User.findOne({ where: { id: req.user.id } });

      const asyncForEach = async (array, cb) => {
        for (let index = 0; index < array.length; index++) {
          await cb(array[index], index, array);
        }
      };
      let search = [];
      let diseaseCriteria = {};

      if (id) {
        diseaseCriteria.type = id;
      }

      let diseases = await DiseasesRecord.findAll({
        where: diseaseCriteria,
        include: [{ all: true }]
      });

      if (diseases.length) {
        if (req.user.role == "stateAdmin") {
          diseases = diseases.filter(disease => {
            return disease.childData.state == user.state;
          });
        }

        await asyncForEach(values, async value => {
          if (value.name == "state") {
            diseases = diseases.filter(disease => {
              return disease.childData.state == value.value;
            });
          }
          if (value.name == "lga") {
            diseases = diseases.filter(disease => {
              return disease.childData.lga == value.value;
            });
          }
          if (value.name == "createdAt") {
            diseases = diseases.filter(disease => {
              return (
                disease.childData.createdAt <= value.value[0] &&
                disease.childData.createdAt >= value.value[1]
              );
            });
          }
          if (value.name == "gender") {
            diseases = diseases.filter(disease => {
              return disease.childData.gender == value.value;
            });
          }
        });

        return res.status(200).json({ message: "Data retrieved", diseases });
      }

      if (!diseases.length) {
        return res.status(400).json({ message: "No Data found" });
      }
    } catch (e) {
      e = e || error.toString();
      return res.status(400).json({ message: "An error occured", e });
    }
  }
};
