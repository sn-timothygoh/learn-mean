const mongoose = require("mongoose");
require("./user.model");

const feedSchema = new mongoose.Schema({
    user : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    content : {
        type: String,
        required: true
    },
    upvote : {
        type: Number,
        default: 0
    },
    downvote : {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("user", feedSchema, "feeds");