/*
  Product
  category
  customer
  total
*/

import { Schema, model } from "mongoose";

const salesSchema = new Schema(
    {
        product:{
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        customer:{
            type: String,
            required: true
        },
        total:{
            type: String,
            required: true
        },
    }, 
    {
        timestamps: true,
        strict: false
    }
);

export default model ("sales", salesSchema);