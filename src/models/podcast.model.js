const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true
  }

}, { versionKey: false, timestamps: true })

const Podcast = mongoose.model("podcast", schema);
module.exports = Podcast;