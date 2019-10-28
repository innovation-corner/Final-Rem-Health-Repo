const ussd = require("./ussdRoutes");
const auth = require("./authRoutes");
const info = require("./infoRoutes");
const user = require("./userRoutes");
const hs = require("./hospitalRoutes");
const sms = require("./smsRoutes");
const hmo = require("./hmoRoutes");
const disease = require("./diseaseRoutes");
const im = require("./immunizationRoutes");
const vaccine = require("./vaccineRoutes");

module.exports = {
  ussd,
  user,
  info,
  hs,
  im,
  disease,
  hmo,
  sms,
  auth,
  vaccine
};
