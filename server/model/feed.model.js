const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
    username : {
        type: String
    },
    title : {
        type: String,
        required : true
    },
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

module.exports = mongoose.model("Feed", feedSchema);