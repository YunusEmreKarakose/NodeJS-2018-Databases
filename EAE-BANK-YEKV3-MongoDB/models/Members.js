const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MembersSchema = new Schema({
    name: String,
    surName: String,
    userName: {
        type: String,
        unique: true
    },
    password: String,
    eMail: {
        type: String,
        unique: true
    },
    resources: {
        coin: Number,
        milk: Number,
        egg: Number,
        honey: Number,
        seed: Number,
        cow: [{
            cal: {
                type: Date,
                default: Date.now
            },
            death: {
                type: Date,
                default: Date.now
            }
        }],
        chicken: [{
            cal: {
                type: Date,
                default: Date.now
            },
            death: {
                type: Date,
                default: Date.now
            }
        }],
        bee: [{
            cal: {
                type: Date,
                default: Date.now
            },
            death: {
                type: Date,
                default: Date.now
            }
        }]
    }
});

module.exports = mongoose.model("member", MembersSchema);