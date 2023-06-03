const mongoose = require("mongoose");
const TourSchema = mongoose.Schema({
    id: {
        type: String,
        require: true,
    },

    name: {
        type: String,
        require: true,
    },

    added_by: {
        type: String,
        require: true,
    },

    start_date: {
        type: String,
        require: true,
    },

    end_date: {
        type: String,
    },
}, 

{ timestamps: {} },

);

module.exports = mongoose.model("Tour", TourSchema);

