const moment = require("moment");
const { Info } = require("../models");
const sms = require("./SmsService");
const messageService = require("./NotificationService");

module.exports = {
  async sixMonthsReminder() {
    const start = moment()
      .subtract(37, "days")
      .startOf("day")
      .toISOString();
    const end = moment()
      .subtract(37, "days")
      .endOf("day")
      .toISOString();

    const info = await Info.findAll({});
    const date = moment()
      .add(5, "days")
      .endOf("day")
      .format("dddd, MMMM Do YYYY");

    const asyncForEach = async (array, cb) => {
      for (let index = 0; index < array.length; index++) {
        await cb(array[index], index, array);
      }
    };

    if (info.length) {
      await asyncForEach(info, async child => {
        if (child.createdAt >= start && child.createdAt <= end) {
          const message = await messageService.sixMonths(child.language, child, date);
          await sms.sendSms(message,'Remind me', child.phonenumber)

        }
      });
    }

  }
};
