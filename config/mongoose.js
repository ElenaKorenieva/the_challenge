const mongoose = require("mongoose");
const schema = mongoose.Schema;
const dotenv = require("dotenv").config();

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => console.log(err));

module.exports = mongoose;
