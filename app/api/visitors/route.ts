import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Visitor from "@/models/visitor"; 
export async function POST() {
  await dbConnect();
  const doc = await Visitor.findOneAndUpdate(
    { _id: "global" },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );
  return NextResponse.json({ count: doc.count });
}

export async function GET() {
  await dbConnect();
  const doc = await Visitor.findById("global");
  return NextResponse.json({ count: doc?.count ?? 0 });
}