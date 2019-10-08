const _ = require("lodash");
const { User, Hospital } = require("../models");
const { assignCode } = require("../Services/HospitalCodeService");

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
      const checkUsername = await User.findOne({
        where: { username }
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

      if (checkUsername) {
        return res.status(400).json({ message: "username already exists" });
      }

      const data = {
        name: contactName,
        email,
        username: phonenumber, //user can log in with phonennumber as username
        phonenumber,
        password,
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

      hosDetails.admin = user.id
      const hospital = await Hospital.create(hosDetails);
      let { code } = await stateCode.selectState(state, lga);
      let hsCode;

      if (hospital.id < 10) {
        hsCode = "000" + hospital.id;
      } else if (hospital.id >= 10 && hospital.id < 99) {
        hsCode = "00" + hospital.id;
      } else if (hospital.id >= 100 && hospital.id < 999) {
        hsCode = "0" + hospital.id;
      } else if (hospital.id >= 1000) {
        hsCode = hospital.id;
      }
      await Hospital.update(
        { id: hospital.id },
        { code: `${code}-${hsCode}`}
      );

      return res
        .status(200)
        .json({ message: "registration successful", responseObj });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "An error occured", e });
    }
  }
};
