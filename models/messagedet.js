const mongoose = require("mongoose");

const messagedetSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});
const Messagedet = mongoose.model("Messagedet", messagedetSchema);
module.exports = Messagedet;
