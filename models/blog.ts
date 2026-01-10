import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import  "./tag";
import "./user";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:200
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        index: true,
        lowercase: true,
    },
    content:{
         type: mongoose.Schema.Types.Mixed,
         required: true,
         minlength: 100,
         maxlength:20000,
    },
    tags:[
        { type: mongoose.Schema.Types.ObjectId,
          ref: 'Tag',
        },

    ],
    featuredImage:{
        type:String,
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    published:{
        type:Boolean,
        default:true,
    },
    excerpt:{
        type:String,
        maxlength:320,
    },


},
{timestamps:true})

blogSchema.plugin(mongooseUniqueValidator, { message: '{PATH} must be unique.' });

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;