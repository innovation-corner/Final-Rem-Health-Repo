const { Info } = require("../models");
const moment = require("moment");

module.exports = {
  async recieveRequest(req, res) {
    let message = "";

    const sessionId = req.body.sessionId;
    const serviceCode = req.body.serviceCode;
    const phoneNumber = req.body.phoneNumber;
    const text = req.body.text;

    console.log(sessionId, serviceCode, phoneNumber, text);
    const length = text.split("*").length;
    const txt = text.split("*");
    let info = txt.filter(e => e != "0");
    let infoLength = info.length;
    let dbInfo = {};
    let language;
    let gender;
    console.log("infoLength", infoLength);
    console.log("txt", txt);
    console.log("info", info);

    if (text === "" && infoLength == 1) {
      message = "CON Welcome to Remind Me \n";
      message += "Please enter your child's full name \n";
      message += "E.g Tobechukwu Chukwuma Chinomso";
    } else if (txt[infoLength - 1] == 0) {
      // go back
      infoLength -= 1;
    } else if (length == 1 && typeof info[0]) {
      infoLength = 2;
      message = "CON Please enter your child's date of bith \n";
      message += "In the format YYYYMMDD \n";
      message += "E.g 20190826\n";
      message += "Press # to go back";
      dbInfo.name = txt[length - 1];
    } else if (infoLength == 2) {
      message = "CON Select your Child's gender \n";
      message += "1. Female \n";
      message += "2. Male\n";
      message += "Press # to go back";
      previousMessage = message;
      dbInfo.dob = moment(txt[length - 1]).toDate();
    } else if (infoLength == 3) {
      message = "CON Enter phone number \n";
      message += "eg. 08012012012\n";
      message += "Press # to go back";
      gender = txt[length - 1];
    } else if (infoLength == 4) {
      dbInfo.phonenumber = txt[length - 1];
      message = "CON Please select your preferred language. \n";
      message += "1.English \n";
      message += "2.Pidgin \n";
      message += "3.Igbo \n";
      message += "4.Yoruba \n";
      message += "5.Hausa \n";
      message += "Press # to go back";
      previousMessage = message;
      infoLength = 5;
    } else if (
      infoLength == 5 &&
      (text[length - 2] == 1 ||
        text[length - 2] == 2 ||
        text[length - 2] == 3 ||
        text[length - 2] == 4 ||
        text[length - 2] == 5)
    ) {
      message =
        "END Congratulations you have now registered your child's birth";
      language = txt[length - 1];
      infoLength = 6;
    }

    if (gender == 1) {
      dbInfo.gender = "Female";
    } else if (gender == 2) {
      dbInfo.gender = "Male";
    }

    if (language == 1) {
      dbInfo.language = "English";
    } else if (language == 2) {
      dbInfo.language = "Pidgin";
    } else if (language == 3) {
      dbInfo.language = "Igbo";
    } else if (language == 4) {
      dbInfo.language = "Yoruba";
    } else if (language == 5) {
      dbInfo.language = "Hausa";
    }

    if (infoLength == 6) {
      const info = await Info.create(dbInfo);
      const data = { immunizationCode: "IM" };
      if (info.id < 10) {
        data.immunizationCode = "IM" + 000 + info.id;
      } else if (info.id >= 10 && info.id < 99) {
        data.immunizationCode = "IM" + 00 + info.id;
      } else if (info.id >= 100 && info.id < 999) {
        data.immunizationCode = "IM" + 0 + info.id;
      } else if (info.id >= 1000) {
        data.immunizationCode = "IM" + info.id;
      }

      const regdInfo = await info.update(data, { where: { id: info.id } });
    }

    res.contentType("text/plain");
    res.status(200).send(message);
  },

  async handleChildRegistration(text, res) {}
};
