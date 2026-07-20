const mongoose = require("mongoose")

const {Schema,model} = mongoose


const commentSchema = new Schema({
    userName:{type:String,require:true},
    userComment:{type:String,require:true},
    blog:{type:String,require:true},
    isApproved:{type:Boolean,default:false}

},{timestamps:true})

module.exports = model("comment",commentSchema)