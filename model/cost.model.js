const mongoose = require("mongoose");
const CostSchema = mongoose.Schema({
    id: {
        type: String,
        require: true,
    },

    reason: {
        type: String,
        require: true,
    },

    amount: {
        type: Number,
        require: true,
    },

    date: {
        type: String,
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
},


    { timestamps: {} },


);

module.exports = mongoose.model("Cost", CostSchema);

