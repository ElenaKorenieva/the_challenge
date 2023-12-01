const express = require("express");
require("./config/mongoose");
const route = require("./config/routes");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(route);
let port = process.env.PORT;
app.listen(port, console.log(`app is on ${port}`));
