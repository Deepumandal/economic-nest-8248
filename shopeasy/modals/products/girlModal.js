const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        name: String,
        image: String,
        brand: String,
        discount_price: String,
        price: String,
        type : String,
        _id: mongoose.Schema.Types.ObjectId
    }
    , {
        versionKey: false
    }
)


const girlModal = mongoose.models.girl || mongoose.model('girl', schema)

module.exports = girlModal