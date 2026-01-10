import Resizer from "react-image-file-resizer";
import toast from "react-hot-toast";

export const imageUpload = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Resize first
    Resizer.imageFileResizer(
      file,
      1280, // max width
      720,  // max height
      "JPEG",
      100, // quality
      0,   // rotation
      async (resizedFile: string | Blob | File | ProgressEvent<FileReader>) => {
        try {
          // Resizer can sometimes return a base64 string depending on options; ensure we have a Blob/File
          if (typeof resizedFile === "string") {
            toast.error("Image upload failed");
            return reject(new Error("Unexpected string result from image resizer"));
          }

          // Treat the result as a Blob/File for FormData
          const blob = resizedFile as Blob;

          // Use FormData to send binary
          const formData = new FormData();
          formData.append("file", blob, file.name);

          const response = await fetch("/api/crud/uploads", {
            method: "POST",
            body: formData, // Do NOT set Content-Type manually
          });

          const data = await response.json();

          if (!response.ok) {
            toast.error(data?.error || "Image upload failed");
            return reject(new Error(data?.error || "Upload failed"));
          }

          toast.success("Image uploaded successfully");
          resolve(data.url);
        } catch (error) {
          toast.error("Image upload failed");
          reject(error);
        }
      },
      "file" 
    );
  });
};
