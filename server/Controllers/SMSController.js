const { SMS } = require("../models");
const sms = require("../Services/SmsService");

module.exports = {
  async send(req, res) {
    try {
      const sender = req.user.id;
      const { recipients, message, save } = req.body;

      await sms.sendSms(message, "RemHealth", recipients);
      if (save) {
        const details = { recipients, message, sender };
        await SMS.create(details);

        return res.status(200).json({ message: "message saved and sent" });
      }

      return res
        .status(200)
        .json({ message: "message sent" });
    } catch (e) {
      return res.status(400).json({ message: "An error occured", e });
    }
  }
};
