// require("appoptics-apm");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const winston = require("winston");
const { Loggly } = require("winston-loggly-bulk");

require("dotenv").config();
// ce218668-0937-49d5-b721-376f1276e12d

// winston.add(
//   new Loggly({
//     token: process.env.loggly_token,
//     subdomain: process.env.loggly_domain,
//     tags: ["Winston-NodeJS"],
//     json: true
//   })
// );

// winston.log("info", "Hello World from Node.js!");

console.log('hi', process.env.env);
require("./server/config/passport");
const app = express();

app.use(logger("dev"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require("./server/Routes");

app.use("/", router.ussd);
app.use("/auth/", router.auth);
app.use(
  "/info/",
  passport.authenticate("jwt", { session: false }),
  router.info
);
app.use(
  "/user/",
  passport.authenticate("jwt", { session: false }),
  router.user
);
app.use(
  "/hospital/",
  passport.authenticate("jwt", { session: false }),
  router.hs
);
app.use("/sms/", passport.authenticate("jwt", { session: false }), router.sms);
app.use("/hmo/", passport.authenticate("jwt", { session: false }), router.hmo);
app.use(
  "/disease/",
  passport.authenticate("jwt", { session: false }),
  router.disease
);
app.use(
  "/immunization/",
  passport.authenticate("jwt", { session: false }),
  router.im
);
app.use(
  "/vaccine/",
  passport.authenticate("jwt", { session: false }),
  router.vaccine
);

// app.get("/", (req, res) =>
//   res.status(401).send({
//     message: "You shouldn't be here!"
//   })
// );

module.exports = app;
