import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import GoogleProvider from "next-auth/providers/google"


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;   
      image?: string;
    };
  }

  interface User {
    id: string;
    username: string;
    email: string;
    role: string;   
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;  
    picture?: string;
  }
}



export const authOptions:NextAuthOptions = {
   session:{
    strategy:"jwt",
    },
   providers :[
    CredentialsProvider({
        name:"Credentials",
        credentials:{
            email:{label:"Email",type:"email"},
            password:{label:"Password",type:"password"},
        },
           async authorize(credentials){
            if(!credentials?.email || !credentials?.password){
                throw new Error("Please enter your email and password");
            }
            await dbConnect();

            const user = await User.findOne ({email:credentials.email}).select("+password");
            if(!user){
                throw new Error("No user found with this email");
            }
            const isPasswordMatched = await bcrypt.compare(credentials.password,user?.password);
              
            if(!isPasswordMatched){
               
                throw new Error("Incorrect password");
            }
           
        
     return {
        id: user._id.toString(),
         username: user.username,
        email: user.email,
        role: user.role,
        image:user.image,
     };
    },
    }),
    //google provider
    GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret:process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
   ],
   secret: process.env.NEXTAUTH_SECRET,
    pages:{
     signIn:"/login",
    },
        callbacks:{
            //saving social login
            async signIn({ user, account}){
                if(account?.provider==="google"){
                    await dbConnect();
                

                const existingUser = await User.findOne({email:user.email});
                if(!existingUser){
                    await User.create({
                        email:user.email,
                        username:user.name,
                        role:["user"],
                        image:user.image,
                        provider:"google",

                    });
                }
            }
            return true;
            },

            async jwt({ token, user }: { 
            
                token: import("next-auth/jwt").JWT; 
                user?: import("next-auth").User | import("next-auth/adapters").AdapterUser; 
               
            }) {
              if (user) {
        token.id = (user).id || token.id;
        token.name = (user).username || user.name || token.name;
        token.email = user.email || token.email;
        token.picture = (user).image || token.picture;
        token.role = (user).role || "user";
              }
      return token;
    },
            async session({ session, token }: { session: import("next-auth").Session; token: import("next-auth/jwt").JWT }) {
                if (session.user && token) {
     (session.user as { id?: string; role?: string;email?:string; image?:string; name?: string }).id = token.id as string
      (session.user as { id?: string; role?: string;email?:string; image?:string; name?: string }).role = token.role as string
       (session.user as { id?: string; role?: string;email?:string; image?:string; name?: string }).email = token.role as string
        (session.user as { id?: string; role?: string;email?:string; image?:string; name?: string }).image = token.role as string
      (session.user as { id?: string; role?: string; email?:string; image?:string; name?: string }).name = token.name as string 
                }
                return session;
            },
        },
        
    };
    


