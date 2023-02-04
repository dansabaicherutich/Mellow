const mongoose = require("mongoose");

const privatemessageschema = new mongoose.Schema({
  author: {
    type: String,
  },
  acontent: {
    type: String,
  },
  partner: {
    type: String,
  },
  pcontent: {
    type: String,
  },
  time: {
    type: String,
  },
});
const Privatemessage = mongoose.model("Privatemessage", privatemessageschema);
module.exports = Privatemessage;
