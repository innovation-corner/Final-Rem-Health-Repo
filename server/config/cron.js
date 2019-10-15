const enableCron = process.env.CRON_ENABLED || false;
const ReminderService = require("../Services/ReminderService");
const cron = require("node-cron");

module.exports = {
  // at 7:00 am every day
  sendImmunizationReminder: {
    schedule: "00 00 07 * * *",
    onTick() {
      console.log("------ Begun Sending Reminders -----");
      ReminderService.sendImmunizationReminder();
    },
    onComplete() {
      console.log("------ Done Sending Reminders -----");
    },
    start: enableCron, // start task immediately
    timezone: "Africa/Lagos", // Custom timezone
    context: undefined // Custom context for onTick callback
  }
};

cron.schedule("00 00 07 * * *", ReminderService.sendImmunizationReminder());
