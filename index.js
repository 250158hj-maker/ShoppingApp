// 定数宣言
const DB = "farmStandTake2";
const PORT = 3000;
// Product
const PRODUCTS_ENDPOINT = "/products";
const VIEWS_PRODUCTS = "products";
const categories = ["野菜", "果物", "乳製品", "パン類"];
// Farm
const FARMS_ENDPOINT = "/farms";
const VIEWS_FARMS = "farms";

// Required Package and Mongoose
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Product = require("./models/product");
const Farm = require("./models/farm");

const app = express();
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

// ===============farms routing===============

// 農場一覧表示
app.get(FARMS_ENDPOINT, async (req, res) => {
    const farms = await Farm.find();
    res.render(`${VIEWS_FARMS}/index`, { farms });
});

// 新規農場作成ページ
app.get(`${FARMS_ENDPOINT}/new`, (req, res) => {
    res.render(`${VIEWS_FARMS}/new`);
});

// 農場のDB登録
app.post(FARMS_ENDPOINT, async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    // 一覧ページへリダイレクト
    res.redirect(FARMS_ENDPOINT);
});

// 詳細表示
app.get(`${FARMS_ENDPOINT}/:id`, async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render(`${VIEWS_FARMS}/show`, { farm });
});

// ===============products routing===============
// 一覧表示
app.get(PRODUCTS_ENDPOINT, async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render(`${VIEWS_PRODUCTS}/index`, { products, category });
    } else {
        const products = await Product.find();
        res.render(`${VIEWS_PRODUCTS}/index`, {
            products,
            category: "All",
            categories,
        });
    }
});

// 新規商品作成ページへ
app.get(`${PRODUCTS_ENDPOINT}/new`, (req, res) => {
    res.render(`${VIEWS_PRODUCTS}/new`, { categories });
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
    res.render(`${VIEWS_PRODUCTS}/edit`, { product, categories });
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

// 商品の削除
app.delete(`${PRODUCTS_ENDPOINT}/:id`, async (req, res) => {
    const { id } = req.params;
    // 削除した商品をログに出すなどの機能の実装ができる
    const delProduct = await Product.findByIdAndDelete(id);
    res.redirect(PRODUCTS_ENDPOINT);
});

// 詳細表示
app.get(`${PRODUCTS_ENDPOINT}/:id`, async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render(`${VIEWS_PRODUCTS}/show`, { product });
});

// Express Server Setup
app.listen(PORT, () => {
    console.log("Port:", PORT);
    console.log("Waiting for Requests");
});
