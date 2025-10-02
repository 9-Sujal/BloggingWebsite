import mongoose, { Document, Model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";



export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "subscriber";
  image?: string;
  resetCode?: {
    code: string;
    expiresAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
     username: {type: String, required: true, trim:true, minlength:3 },
     email: {type: String, required: true, unique: true,index:true, lowercase: true },
     password:{type: String, required: true, select:false, minlength: 5},
     role:{type: String, enum:['user','author'], default:'user'},
     image:{type: String},
     resetCode:{
      code:{type: String},
      expiresAt:{
        type: Date, 
        default: ()=> new Date(Date.now()+10*60*1000)},
},
},
{timestamps:true});


userSchema.plugin(mongooseUniqueValidator,
  {message: '{PATH} is already taken.'

  });

const User:Model<IUser> = 
mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
