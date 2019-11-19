const mongoose = require("mongoose");
const moment = require("moment");

let UserSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  // add in business boolean
  timestamp: {
    type: String,
    default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
  }
});

module.exports = mongoose.model("user", UserSchema);