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

Product.deleteMany()
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

Product.insertMany([
    {
        name: "ルビーグレープフルーツ",
        price: 198,
        category: "果物",
    },
    {
        name: "ナス",
        price: 98,
        category: "野菜",
    },
    {
        name: "カットメロン",
        price: 480,
        category: "果物",
    },
    {
        name: "種無しスイカのカット",
        price: 380,
        category: "果物",
    },
    {
        name: "オーガニックセロリ",
        price: 198,
        category: "野菜",
    },
    {
        name: "コーヒー牛乳",
        price: 298,
        category: "乳製品",
    },
])
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
