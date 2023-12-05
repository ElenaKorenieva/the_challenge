const mongoose = require("mongoose");
const moment = require("moment");
const schema = mongoose.Schema;

const postSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 15,
    },
    message: {
      type: String,
      required: true,
      maxLength: 40,
    },
    getDate: {
      type: Date,
      default: Date.now,
      get: function (createdAt) {
        return moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");
      },
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
