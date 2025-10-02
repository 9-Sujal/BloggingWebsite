import {NextResponse} from 'next/server';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { ins } from 'framer-motion/client';


export async function POST(request:Request){
    try{
         const {username,email,password} = await request.json();
       
         if(!username || !email || !password){
            return NextResponse.json({error:'All fields are required'}, {status: 400});
        }

        await dbConnect();


        const existing = await User.findOne({ email });


    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }


        //create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        })


      await user.save();


      return NextResponse.json(
        {user:{username:user.username}, message:'User registered successfully'}, 
        {status: 201});
   
    }catch(error:unknown){
         console.error("register:",error)
            if (error instanceof Error) {
         return NextResponse.json(
            {error:'Failed to register user', details: error.message}, 
            {status: 500});
         }
         return NextResponse.json({ error: "Server error" }, { status: 500 });

    }
}