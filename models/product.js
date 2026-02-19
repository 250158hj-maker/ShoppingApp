const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "商品名は必須です。"],
    },
    price: {
        type: Number,
        required: true,
        min: [0, "価格は0以上で、必須です。"],
    },
    category: {
        type: String,
        enum: {
            values: ["果物", "野菜", "乳製品"],
            message:
                "カテゴリーは「果物・野菜・乳製品」のいずれかのみ使用できます",
        },
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: "Farm",
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
