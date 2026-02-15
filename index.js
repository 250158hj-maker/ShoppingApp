// Required Package
const express = require("express");
const app = express();
const path = require("path");

// Express Settings
app.set("views", path.join(__dirname), "views");
app.set("view engine", "ejs");

// 定数宣言
const PORT = 3000;

// Express Server Setup
app.listen(PORT, () => {
    console.log("Port:", PORT);
    console.log("Waiting for Requests");
});
