const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    
    id: {
        type: String,
        require: true,
    },

    name: {
        type: String,
    },

    phone: {
        type: Number,
        require: true,
    },

    password: {
        type: String,
        require: true,
    },

    role: {
        type: String,
        default: "admin",
    }


},

{ timestamps: {} }

);

module.exports = mongoose.model("User", UserSchema);
