import { Schema } from "mongoose";

const branchesSchema = new Schema({
    name:{
        type: String,
        require: true,
        maxLength: 100
    },
    addres:{
        type: String,
        require: true,
        maxLength: 100
    },
    birthday:{
        type: Date,
        require: true,
        min: 0,
    },
    telephone:{
        type: Number,
        require: true,
        maxLength: 8
    },
    schedule:{
        type: Boolean
    }
},{
    timestamps: true,
    strict: false
})

export default model("branchesModel", branchesSchema);