import { useState } from "react";
import { uploadImage } from "../../utils/cloudinary";

export default function ImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const url = await uploadImage(file);

      onChange(url);

    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed");

    } finally {
      setUploading(false);
    }
  };


  return (
    <div className="flex flex-col gap-3">

      {value && (
        <img
          src={value}
          alt="Preview"
          className="w-40 h-40 object-cover rounded-lg"
        />
      )}


      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />


      {uploading && (
        <p className="text-sm text-forest-600">
          Uploading image...
        </p>
      )}

    </div>
  );
}
