const mongoose = require("mongoose")

const {Schema,model} = mongoose


const blogSchema = new Schema({
    title:{type:String,required:true},
    subTitle:{type:String},
    description:{type:String,required:true},
    category:{type:String,required:true},
    publish:{type:String,required:true},
    blogImage:{type:String,require:true}
},{timestamps:true});


module.exports = model("blog",blogSchema)