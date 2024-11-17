"use client";

import { useState } from "react";
import { PinataSDK } from "pinata-web3";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxM2UzZDlmMi01ZDhhLTRkODktYWU5Ny1hM2MyYzBlOTE1MTAiLCJlbWFpbCI6InJhcGhhZWxqY28wOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzc0MDNjNGNmZmY4NzU4NTE3MjUiLCJzY29wZWRLZXlTZWNyZXQiOiIzN2U1NGFiZjQxYTU5ZGQyZWUzMWVjYjE5OWNlNzkzMjcwYmMyMGJlYjRhZTllYWZkZWFjMDc0NmZkYjVmM2E0IiwiZXhwIjoxNzYzMzMxNjE4fQ.AAxb2vOqRvL5wjPxttjZ2cozwEVN59Hq0TKwQosZ_Q8";

export default function UploadImage() {
  const [image, setImage] = useState<string | null>(null);
  const [cid, setCid] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
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
      setCid(upload.IpfsHash);
      setImage(null); // Clear the image after uploading
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8 shadow-lg">
      <Header />
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
      {cid && (
        <div className="mt-4 text-center">
          <p className="font-medium">CID:</p>
          <span className="text-blue-300">{cid}</span>
        </div>
      )}
      <Link href="/DecodeImage">
        <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 mt-4">
          Decode Image
        </Button>
      </Link>
      {/* Footer Section */}
      <Footer />
    </div>
  );
}