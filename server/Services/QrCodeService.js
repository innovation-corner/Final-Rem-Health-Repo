const request = require("request");
const dotenv = require("dotenv");

dotenv.config();
const base = process.env.qr_base_url;

module.exports = {
  async generate(imCode) {
    try {
      await request.get(
        `${base}create-qr-code/?size=150x150&data=${imCode}`,
        { form: "" },
        (e, res, body) => {
          if (e) {
            console.log(`error generating qr code`);
            return;
          }
          if (body) {
            console.log(`--------------body-qrCode`, body);
            return body;
          }
        }
      );
    } catch (error) {
      console.log(`--------------error`, error);
    }
  }
};
