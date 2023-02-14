const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema({
  refresh_token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Blacklist", BlacklistSchema);
