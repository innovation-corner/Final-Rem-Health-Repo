const request = require("request");
const dotenv = require("dotenv");

dotenv.config();

let mainData = {
  token: process.env.sms_token,
  message: "",
  routing: 4,
  to: "",
  sender: "",
  type: 0
};

module.exports = {
  async sendSms(message, sender, recipients) {
    try {
      const url = process.env.sms_base_url;
      mainData.to = recipients;
      mainData.sender = sender || "Remind Me";
      mainData.message = message;

      console.log("----------------begin sending sms----------------", message);

      await request.post(url, { form: mainData }, (e, res, body) => {
        if (e) {
          console.log("----------------error sending sms----------------", e);
          return;
        }
        console.log("body", body);
        console.log("----------------sent sms----------------");
      });

      console.log("----------------done sending sms----------------");
    } catch (e) {
      console.log("----------------error sending sms----------------", e);
    }
  }
};
