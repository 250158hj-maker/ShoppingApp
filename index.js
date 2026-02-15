// 定数宣言
const DB = "farmStand";
const DB_CONNECT_MSG = "MongoDB connected!!";
const PORT = 3000;

// Required Package and Mongoose
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
mongoose
    .connect(`mongodb://localhost:27017/${DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Success:", DB_CONNECT_MSG);
    })
    .catch((err) => {
        console.log("Error:", err);
    });

// Express Settings
app.set("views", path.join(__dirname), "views");
app.set("view engine", "ejs");

app.get("/dog", (req, res) => {
    res.send("wanwan");
});

// Express Server Setup
app.listen(PORT, () => {
    console.log("Port:", PORT);
    console.log("Waiting for Requests");
});
