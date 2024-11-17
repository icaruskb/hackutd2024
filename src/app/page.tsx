"use client";

import { useState } from "react";
import { PinataSDK } from "pinata";
import Link from "next/link"


const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxM2UzZDlmMi01ZDhhLTRkODktYWU5Ny1hM2MyYzBlOTE1MTAiLCJlbWFpbCI6InJhcGhhZWxqY28wOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzc0MDNjNGNmZmY4NzU4NTE3MjUiLCJzY29wZWRLZXlTZWNyZXQiOiIzN2U1NGFiZjQxYTU5ZGQyZWUzMWVjYjE5OWNlNzkzMjcwYmMyMGJlYjRhZTllYWZkZWFjMDc0NmZkYjVmM2E0IiwiZXhwIjoxNzYzMzMxNjE4fQ.AAxb2vOqRvL5wjPxttjZ2cozwEVN59Hq0TKwQosZ_Q8";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setImageURL(null); // Reset URL when a new image is uploaded
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const pinata = new PinataSDK({
    pinataJwt: JWT,
    pinataGateway: "plum-immediate-parrotfish-603.mypinata.cloud",
  });

  const uploadToPinata = async () => {
    if (!file) {
      console.log("No file selected for upload.");
      return;
    }
    try {
      const upload = await pinata.upload.file(file);
      console.log(upload);

      const fileA = await pinata.gateways.get(upload.cid);

      console.log(fileA);
      

      // Set the CID in the state
      setCid(upload.cid);

      // Clear the file and imageURL after uploading
      setFile(null);
      setImageURL(null);

      // Generate URL
      const newURL = await pinata.gateways.createSignedURL({
        cid: upload.cid,
        expires: 30,
      });

      console.log(newURL);

    } catch (error) {
      console.log(error);
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
        <button onClick={uploadToPinata} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Upload to Pinata
        </button>
      </div>
      {cid && (
        <div className="mt-4">
          <p>CID:</p>
          <span className="text-blue-300">{cid}</span>
        </div>
      )}
      {imageURL && (
        <div className="mt-4">
          <p>Image URL:</p>
          <a href={imageURL} target="_blank" rel="noopener noreferrer" className="text-blue-300">
            {imageURL}
          </a>
        </div>
      )}
      <Link href="/uploadImage">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Decode Image
        </button>
      </Link>
    </div>
  );
}
