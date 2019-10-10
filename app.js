const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

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
app.use(
  "/sms/",
  passport.authenticate("jwt", { session: false }),
  router.sms
);

// app.get("/", (req, res) =>
//   res.status(200).send({
//     message: "Welcome to the beginning of nothingness."
//   })
// );

module.exports = app;
