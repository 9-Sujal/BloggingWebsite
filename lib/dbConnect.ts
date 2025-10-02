// import mongoose from "mongoose";

// const URL = process.env.DB_URL as string;
// mongoose.set("strictQuery", false);

// if (!URL) {
//   throw new Error("DB_URL is missing in environment variables");
// }

// const dbConnect = async () => {
//   if (mongoose.connection.readyState >= 1) return;

//   try {
//     await mongoose.connect(URL);
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//     throw err;
//   }
// };

// export default dbConnect;

// lib/dbconnect.ts
// lib/dbconnect.ts
import mongoose, { Mongoose } from "mongoose";

const URL = process.env.DB_URL as string;
if (!URL) {
  throw new Error("DB_URL missing in .env.local");
}

mongoose.set("strictQuery", false);

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend global type to include `mongoose`
declare global {
  var mongoose: MongooseCache | undefined;
}

// Use global cache to avoid multiple connections in dev
let cached = global.mongoose;

if (!cached) {
  cached = { conn: null, promise: null };
  global.mongoose = cached;
}

export default async function dbConnect(): Promise<Mongoose> {
  if (cached!.conn) return cached!.conn;

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(URL).then((m) => {
      console.log("✅ MongoDB connected");
      return m;
    });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
