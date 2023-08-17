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
        address:{
            street: {
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
        card:{
            type: Schema.Types.ObjectId,
            ref: 'Card',
          }
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Customer', customerSchema);