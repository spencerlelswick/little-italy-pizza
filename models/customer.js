const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String
        },
        addressInfo: {
            address:{
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            zip: {
                type: Number
            }
        },
        paymentInfo:{
            paymentMethod: {
                type: String,
                enum: ["cash","card"]
            },
            ccName: {
                type: String,
            },
            ccNum: {
                type: String,
            },
            ccExp: {
                type: String,
            },
            ccCvv: {
                type: String,
            }
        }
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Customer', customerSchema);