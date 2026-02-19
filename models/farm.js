const mongoose = require("mongoose");
const { Schema } = mongoose;
const Product = require("./product");

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, "農場名は必須です。"],
    },
    city: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Emailは必須です。"],
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
});

farmSchema.post("findOneAndDelete", async function (delFarm) {
    if (delFarm.products.length) {
        const result = await Product.deleteMany({
            _id: { $in: delFarm.products },
        });
        console.log(result);
    }
});

const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;
