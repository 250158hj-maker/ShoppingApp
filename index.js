// 定数宣言
const DB = "farmStand";

const PRODUCTS_ENDPOINT = "/products";
const VIEWS_DIRECTORY = "products";

const PORT = 3000;

// Required Package and Mongoose
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//  ==== API ===
// 一覧表示
app.get(PRODUCTS_ENDPOINT, async (req, res) => {
    const products = await Product.find();
    res.render(`${VIEWS_DIRECTORY}/index`, { products });
});

// 新規商品作成ページへ
app.get(`${PRODUCTS_ENDPOINT}/new`, (req, res) => {
    res.render(`${VIEWS_DIRECTORY}/new`);
});

// 新規商品登録
app.post(PRODUCTS_ENDPOINT, async (req, res) => {
    // --- 本来はここでバリデーションチェックが必要
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`${PRODUCTS_ENDPOINT}/${newProduct.id}`);
});

// 商品編集ページへ
app.get(`${PRODUCTS_ENDPOINT}/:id/edit`, async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render(`${VIEWS_DIRECTORY}/edit`, { product });
});

// 商品の編集
app.put(`${PRODUCTS_ENDPOINT}/:id`, async (req, res) => {
    const { id } = req.params;
    // --- 本来はここでバリデーションチェックが必要
    const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    // mongoDBから帰ってきた確実なIDを使用
    res.redirect(`${PRODUCTS_ENDPOINT}/${product._id}`);
});

// 詳細表示
app.get(`${PRODUCTS_ENDPOINT}/:id`, async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render(`${VIEWS_DIRECTORY}/show`, { product });
});

// Express Server Setup
app.listen(PORT, () => {
    console.log("Port:", PORT);
    console.log("Waiting for Requests");
});
