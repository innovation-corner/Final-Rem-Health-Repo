const _ = require("lodash");
const { User, Hospital, Info } = require("../models");
const JwtService = require("../modules/auth.module");
const { Op } = require("sequelize");
const {
  assignStateCode,
  assignLga
} = require("../Services/HospitalCodeService");

module.exports = {
  async create(req, res) {
    try {
      const {
        name,
        phonenumber,
        email,
        password,
        address,
        state,
        lga,
        contactName
      } = req.body;

      if (
        _.isEmpty(name) ||
        _.isEmpty(phonenumber) ||
        _.isEmpty(email) ||
        _.isEmpty(password) ||
        _.isEmpty(address) ||
        _.isEmpty(state) ||
        _.isEmpty(lga) ||
        _.isEmpty(contactName)
      ) {
        return res.status(400).json({ message: "missing fields" });
      }

      const hosDetails = {
        name,
        phonenumber,
        email,
        address,
        state,
        lga
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
        username: phonenumber, //user can log in with phonennumber as username
        phonenumber,
        password,
        state,
        role: 'hospitalAdmin'
      };

      const user = await User.create(data);
      const token = await JwtService.issueToken({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      });

      hosDetails.admin = user.id;
      const hospital = await Hospital.create(hosDetails);
      let stateCode = await assignStateCode(state);
      let lgaCcode = await assignLga(lga);
      let hsCode;
      // return console.log(stateCode,lgaCcode)

      if (hospital.id < 10) {
        hsCode = "000" + hospital.id;
      } else if (hospital.id >= 10 && hospital.id < 99) {
        hsCode = "00" + hospital.id;
      } else if (hospital.id >= 100 && hospital.id < 999) {
        hsCode = "0" + hospital.id;
      } else if (hospital.id >= 1000) {
        hsCode = hospital.id;
      }
      hospital.code = `${stateCode}-${lgaCcode}-${hsCode}`;
      // hospital.admin = user.id
      console.log(hosDetails);
      await hospital.save();

      const responseObj = { user, token, hospital };

      return res
        .status(200)
        .json({ message: "registration successful", responseObj });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "An error occured", e });
    }
  },

  async edit(req, res) {
    try {
      const { name, phonenumber, email, address, state, lga, admin } = req.body;
      const { id } = req.params;
      const hospital = await Hospital.findOne({ where: { id } });
      const existingAdmin = await User.findOne({
        where: { id: hospital.admin }
      });
      const hosDetails = {
        name,
        address,
        state,
        lga,
        admin
      };

      await Hospital.update(hosDetails, { where: { id: hospital.id } });

      return res.status(200).json({ message: "succesfully updated" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "An error occured", e });
    }
  },

  async view(req, res) {
    try {
      const { id } = req.params;
      let hospital = await Hospital.findOne({
        where: { id }
      });
      if (!hospital) {
        return res.status(400).json({ message: "Invalid Selection" });
      }

      const admin = await User.findOne({ where: { id: hospital.admin } });
      hospital.admin = admin;

      return res.status(200).json({ message: "retrieved hospital", hospital });
    } catch (error) {
      console.log(error);
      error = error || error.toString();
      return res.status(400).json({ message: "An error occured", error });
    }
  },

  async viewAll(req, res) {
    try {
      let query = {};

      const { search } = req.query;
      if (search) {
        query[Op.or] = [
          { name: { [Op.like]: "%" + search + "%" } },
          { state: search },
          { lga: search },
          { code: search }
        ];
      }
      if (req.user.role == "stateAdmin") {
        const user = await User.findOne({ where: { id: req.user.id } });
        query = {
          state: user.state
        };
      }

      const hospitals = await Hospital.findAll({ where: query });
      if (!hospitals.length) {
        return res.status(400).json({ message: "No hospitals" });
      }

      return res
        .status(200)
        .json({ message: "retrieved hospitals", hospitals });
    } catch (error) {
      console.log(error);
      error = error || error.toString();
      return res.status(400).json({ message: "An error occured", error });
    }
  },

  async complexSearch(req, res) {
    try {
      const { values } = req.body;
      let criteria = {};

      const asyncForEach = async (array, cb) => {
        for (let index = 0; index < array.length; index++) {
          await cb(array[index], index, array);
        }
      };

      let search = [];
      await asyncForEach(values, async value => {
        if (value.name == "dob") {
          switch (value.type) {
            case "between":
              search.push({
                dob: { [Op.between]: [value.value[0], value.value[1]] }
              });
              break;
            case "equals":
              search.push({ dob: value });
          }
        }
        if (value.name == "state") {
          search.push({ state: value.value });
        }
        if (value.name == "lga") {
          search.push({ lga: value.value });
        }
        if (value.name == "createdAt") {
          search.push({ createdAt: value.value });
        }
        if (value.name == "gender") {
          search.push({ gender: value.value });
        }
      });
      criteria[Op.and] = search;

      const data = await Info.findAll({ where: criteria });
      if (!data.length) {
        return res.status(400).json({ message: "No data" });
      }
      return res.status(200).json({ message: "Data retrieved", data });
    } catch (error) {
      error = error || error.toString();
      return res
        .status(400)
        .json({ message: "An error occurred", error: error.toString() });
    }
  }
};
