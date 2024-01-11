import mongoose from 'mongoose'
const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        requird:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        require:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        type:Boolean,
    },

},{timestamps:true}
);

export default mongoose.model('Products',productSchema)