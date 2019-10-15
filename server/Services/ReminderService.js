const moment = require("moment");
const { Info } = require("../models");
const sms = require("./SmsService");
const messageService = require("./NotificationService");

module.exports = {
  async sixMonthsReminder() {
    const start = moment()
      .subtract(num, "days")
      .startOf("day")
      .toISOString();
    const end = moment()
      .subtract(num, "days")
      .endOf("day")
      .toISOString();

    const info = await Info.findAll({});

    // immunization date
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
          const message = await messageService.sixMonths(
            child.language,
            child,
            date
          );
          await sms.sendSms(message, "Remind me", child.phonenumber);
        }
      });
    }
  },

  async fiveDaysBefore(num, type) {
    const start = moment
      .subtract(num, type)
      .startOf("day")
      .toISOString();
    const end = moment()
      .subtract(num, type)
      .endOf("day")
      .toISOString();

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
          const message = await messageService.sixMonths(
            child.language,
            child,
            date
          );
          await sms.sendSms(message, "Remind me", child.phonenumber);
        }
      });
    }
  } 
};
