const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema(
    {
        ccName: {
            type: String
        },
        ccNum: {
            type: String
        },
        ccExp: {
            type: String
        },
        ccCvv: {
            type: Number
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Card', cardSchema);