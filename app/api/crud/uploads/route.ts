import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/dbConnect";

// Use CLOUDINARY_URL in your .env
// Example: CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME

cloudinary.config({
  secure: true,    // optional, ensures HTTPS URLs
  timeout: 60000,  // optional, 60 seconds timeout
});

export async function POST(req: Request) {
  try {
    // Connect to DB if needed
    await dbConnect();

    // Parse FormData
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "my_image_uploads" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    // Return the Cloudinary URL
    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error: unknown) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
