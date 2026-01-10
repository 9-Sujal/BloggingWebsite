import mongoose, { Document, Model } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'


export interface ITag extends Document {
 name: string
 slug:string
 createdAt?: Date
 updatedAt?: Date
 postedBy?:mongoose.Types.ObjectId;
}


const tagSchema = new mongoose.Schema<ITag>({
    name:{
      type:String,
      required: true,
      unique: true,
      minLength:1,
      maxLength:32,
      trim:true,
    },
    slug:{
         type:String,
      required: true,
      unique: true,
      lowercase: true,
      index:true,
      trim:true,
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },


},
{timestamps: true}
)

tagSchema.plugin(mongooseUniqueValidator, {message: "is already taken"})



const Tag:Model<ITag> = 
mongoose.models.Tag || mongoose.model<ITag>('Tag', tagSchema);

export default Tag;
