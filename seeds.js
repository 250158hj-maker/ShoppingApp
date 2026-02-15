const DB = "farmStand";
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

const p = new Product({
    name: "ルビーグレープフルーツ",
    price: 198,
    category: "果物",
});

p.save()
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
