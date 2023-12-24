require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
const api_routes = require("./api");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({"extended":true}))
app.use("/api", api_routes);

mongoose.connect(`${process.env.DB_URL}`)
  .then(() => {
    console.log("Connected to DB");
    app.listen(3000,() => {
        console.log("Up and running on port 3000");
    })
  })
  .catch(() => {
    console.error("Error in connecting");
  })