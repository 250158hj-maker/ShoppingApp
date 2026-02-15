// 定数宣言
const mongoose = require("mongoose");

// Model Setting
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "priceは0以上の値にしてください"],
    },
    category: {
        type: String,
        enum: {
            values: ["果物", "野菜", "乳製品"],
            message:
                "カテゴリーは「果物・野菜・乳製品」のいずれかのみ使用できます",
        },
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
