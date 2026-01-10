"use client";
import React, { useEffect } from "react";
import { imageUpload } from "@/lib/imageUpload";
import { useBlog } from "@/context/blog";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface BlogFormProps {
  onNextStep?: () => void;
  onPrevStep?: () => void;
}

export default function FeaturedImage({
  onNextStep,
  onPrevStep,
}: BlogFormProps) {
  const {
    featuredImage,
    setFeaturedImage,
    uploadImage,
    setUploadImage,
    imagePreview,
    setImagePreview,
  } = useBlog();

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      toast.error("No image selected");
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImagePreview(event.target.result as string);
        localStorage.setItem(
          "imagePreview",
          event.target.result as string
        );
      }
    };
    reader.readAsDataURL(file);

    setUploadImage(true);

    try {
      const imageUrl = await imageUpload(file);
      setFeaturedImage(imageUrl);
      localStorage.setItem("featuredImage", imageUrl);
      toast.success("Featured image uploaded");
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
    } finally {
      setUploadImage(false);
    }
  };

  useEffect(() => {
    const storedPreview = localStorage.getItem("imagePreview");
    const storedImage = localStorage.getItem("featuredImage");

    if (storedPreview) setImagePreview(storedPreview);
    if (storedImage) setFeaturedImage(storedImage);
  }, [setImagePreview, setFeaturedImage]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="
          w-full max-w-3xl
          rounded-2xl
          bg-white/5
          border border-white/10
          backdrop-blur-xl
          shadow-[0_30px_80px_rgba(0,0,0,0.7)]
          p-6 sm:p-8
          space-y-6
        "
      >
        <h2 className="text-xl font-semibold text-zinc-100">
          Featured Image
        </h2>
        <p className="text-sm text-zinc-400">
          Upload a high-quality image for your blog cover.
        </p>

        {/* Preview */}
        <div className="flex justify-center">
          {imagePreview ? (
            <motion.img
              key={imagePreview}
              src={imagePreview}
              alt="Featured Preview"
              className="
                w-full max-w-xl
                aspect-video
                object-cover
                rounded-xl
                border border-white/10
                shadow-lg
              "
              initial={{ opacity: 0.6, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <div
              className="
                w-full max-w-xl
                aspect-video
                flex flex-col items-center justify-center
                border-2 border-dashed border-white/20
                rounded-xl
                text-zinc-400
              "
            >
              <p className="text-sm">No image selected</p>
              <p className="text-xs opacity-70">
                Upload a featured image
              </p>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <label className="flex justify-center">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className={`
              px-5 py-2.5 rounded-lg text-sm font-medium
              border border-white/15
              ${
                uploadImage
                  ? "bg-white/10 text-zinc-400 cursor-wait"
                  : "bg-white/5 text-zinc-200 hover:bg-white/10"
              }
              transition
            `}
          >
            {uploadImage ? "Uploading..." : "Upload Image"}
          </motion.div>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </label>

        {/* Navigation */}
        {(onPrevStep || onNextStep) && (
          <div className="flex justify-between pt-4 gap-4">
            {onPrevStep && (
              <button
                onClick={onPrevStep}
                disabled={uploadImage}
                className="
                  flex-1 px-4 py-2 rounded-lg
                  bg-white/5 border border-white/15
                  text-zinc-300 hover:bg-white/10
                  transition
                "
              >
                Previous
              </button>
            )}

            {onNextStep && (
              <button
                onClick={onNextStep}
                disabled={uploadImage || !featuredImage}
                className="
                  flex-1 px-4 py-2 rounded-lg
                  bg-gradient-to-r from-blue-500/80 to-purple-500/80
                  text-white font-medium
                  hover:opacity-90
                  transition
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
