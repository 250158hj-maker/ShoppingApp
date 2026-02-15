// 定数宣言
const DB = "farmStand";
const PORT = 3000;

// Required Package and Mongoose
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");
mongoose
    .connect(`mongodb://localhost:27017/${DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Success: MongoDB connected!!");
    })
    .catch((err) => {
        console.log("Error:", err);
    });

// Express Settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/products", async (req, res) => {
    const products = await Product.find();
    res.render("products/index", { products });
});

// Express Server Setup
app.listen(PORT, () => {
    console.log("Port:", PORT);
    console.log("Waiting for Requests");
});
