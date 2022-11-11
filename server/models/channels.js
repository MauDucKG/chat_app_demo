const mongoose = require("mongoose");
const channelSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
});

const ChannelSchema = mongoose.model("msg", msgSchema);
module.exports = ChannelSchema;
