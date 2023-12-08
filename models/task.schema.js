const {Schema, model} = require("mongoose");

const taskSchema = Schema({

    name:{
        type: String,
        trim: true,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
      },
    
});

module.exports = model("taskModel", taskSchema);