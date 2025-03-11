
import { Schema, model } from "mongoose";

const customersSchema = new Schema({
    name:{
        type: String,
        require: true,
        maxLength: 100
    },
    lastName: {
        type: String,
        require: true,
        maxLength: 100
    },
    birthday: {
        type: String,
        require: true,
        maxLength: 100
    },
    email: {
        type: String,
        require: true,
        maxLength: 100
    },
    password: {
        type: String,
        require: true,
        maxLength: 100
    },
    telephone: {
        type: Number,
        require: true,
        maxLength: 8
    },
    dui: {
        type: String,
        require: true,
        maxLength: 10
    },
    isVerified: {
        type: Boolean
    }


},{
    timestamps: true,
    strict: false
})

export default model("customersModel", customersSchema);