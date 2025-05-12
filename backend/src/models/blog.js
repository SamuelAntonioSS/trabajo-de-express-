/*

    Coleccion: BLog

    Campos:
    Tittle
    Content
    image

*/

import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    tittle:{
        type: String
    },
    content:{
        type: String
    },
    image:{
        type: String
    }
},{
    timeseries: true,
    strict: false
}
)

export default model("blog", blogSchema)