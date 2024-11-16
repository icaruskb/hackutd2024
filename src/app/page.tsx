"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setImageURL(null); // Reset URL when a new image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImageURL = () => {
    if (image) {
      setImageURL(image);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="text-xl mb-4">Enter Image Name</h1>
      <div className="border-2 border-blue-500 w-64 h-64 flex items-center justify-center mb-4">
        {image ? (
          <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
        ) : (
          <label className="text-gray-500 cursor-pointer">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>
      <div className="flex gap-4">
        <button className="bg-green-500 text-black px-4 py-2 rounded">Reveal</button>
        <button className="bg-red-500 text-black px-4 py-2 rounded">Burn</button>
        <button
          onClick={generateImageURL}
          className="bg-blue-500 text-black px-4 py-2 rounded"
        >
          Generate URL
        </button>
      </div>
      {imageURL && (
        <div className="mt-4">
          <p>Image URL:</p>
          <a href={imageURL} target="_blank" rel="noopener noreferrer" className="text-blue-300">
            {imageURL}
          </a>
        </div>
      )}
    </div>
  );
}
