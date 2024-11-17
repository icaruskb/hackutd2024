"use client";
//x

import { useState } from "react";
import { PinataSDK } from "pinata-web3";
import { Button } from "@/components/ui/button"

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
      uploadToPinata(selectedFile);
      reader.readAsDataURL(selectedFile);
    }
  };

  const pinata = new PinataSDK({
    pinataJwt: JWT,
    pinataGateway: "plum-immediate-parrotfish-603.mypinata.cloud",
  });

  const uploadToPinata = async (file: File) => {
    if (!file) {
      console.log("No file selected for upload.");
      return;
    }
    try {

      const upload = await pinata.upload.file(file);
      console.log(upload);

      // Set the CID in the state
      setCid(upload.IpfsHash);

      // Clear the file and imageURL after uploading
      setFile(null);
      setImageURL(null);

      // Generate URL

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Upload Your Image</h1>
      <div className="border-4 border-blue-500 w-64 h-64 flex items-center justify-center mb-4 rounded-lg overflow-hidden">
        {image ? (
          <img src={image} alt="Uploaded" className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105" />
        ) : (
          <label className="text-gray-400 cursor-pointer hover:text-blue-300 transition-colors duration-200">
            Click to Upload Image
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
      </div>
      {cid && (
        <div className="mt-4 text-center">
          <p className="font-medium">CID:</p>
          <span className="text-blue-300">{cid}</span>
        </div>
      )}
      {imageURL && (
        <div className="mt-4 text-center">
          <p className="font-medium">Image URL:</p>
          <a href={imageURL} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
            {imageURL}
          </a>
        </div>
      )}
        <Link href="/DecodeImage">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
            Decode Image
          </Button>
        </Link>
    </div>
  );

}
