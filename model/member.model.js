const mongoose = require("mongoose");
const MemberSchema = mongoose.Schema({
    
    id: {
        type: String,
        require: true,
    },

    name: {
        type: String,
        require: true,
    },

    phone: {
        type: Number,
        require: true,
    },

    tour_id: {
        type: String,
        require: true,
    },

    added_by: {
        type: String,
        require: true,
    },

    given_amount: {
        type: Number,
        default: 0,
    },

    image: {
        type: String,
    },

},

{ timestamps: {} }

);

module.exports = mongoose.model("Member", MemberSchema);
