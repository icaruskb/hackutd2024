// hackutd2024/src/components/decodeImage.tsx
"use client";

import { useState } from "react";
import { PinataSDK } from "pinata-web3";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "./footer";
const pinata = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxM2UzZDlmMi01ZDhhLTRkODktYWU5Ny1hM2MyYzBlOTE1MTAiLCJlbWFpbCI6InJhcGhhZWxqY28wOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzc0MDNjNGNmZmY4NzU4NTE3MjUiLCJzY29wZWRLZXlTZWNyZXQiOiIzN2U1NGFiZjQxYTU5ZGQyZWUzMWVjYjE5OWNlNzkzMjcwYmMyMGJlYjRhZTllYWZkZWFjMDc0NmZkYjVmM2E0IiwiZXhwIjoxNzYzMzMxNjE4fQ.AAxb2vOqRvL5wjPxttjZ2cozwEVN59Hq0TKwQosZ_Q8",
  pinataGateway: "plum-immediate-parrotfish-603.mypinata.cloud",
});

export default function DecodeImage() {
  const [cid, setCid] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleDecode = async () => {
    if (!cid) {
      console.log("CID is required to decode the image.");
      setErrorMessage("CID is required to decode the image.");
      return;
    }
    setErrorMessage(null); // Clear error message if CID is present

    try {
      // Replace with your actual logic to fetch the image from IPFS using the CID
      const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageSrc(url);
    } catch (error) {
      console.error("Error decoding image:", error);
    }
  };

  const handleBurn = async () => {
    if (!cid) {
      console.log("CID is required to burn the image.");
      setErrorMessage("CID is required to burn the image.");
      return;
    }
    setErrorMessage(null);
    await pinata.unpin([cid]);
    setErrorMessage("Image has been burned.");
    setImageSrc(null);
    setCid(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8 rounded-lg shadow-lg">
      <Header />
      <h1 className="text-2xl font-semibold mb-4">Decode Your Image</h1>
      <input
        type="text"
        value={cid || ""}
        onChange={(e) => setCid(e.target.value)}
        placeholder="Enter CID"
        className="mb-4 p-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errorMessage && (
        <p className="text-red-500 mb-4">{errorMessage}</p>
      )}
      <Button
        onClick={handleDecode}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 mb-2"
        >
        Decode Image
      </Button>
      <Button
        onClick={handleBurn}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 mb-2"
      >
        Burn Image
      </Button>
      <Link href="./">
        <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 mb-2">
          Upload Image
        </Button>
      </Link>
      {imageSrc && (
        <div className="border-4 border-blue-500 w-64 h-64 flex items-center justify-center mb-4 rounded-lg overflow-hidden">
          <img src={imageSrc} alt="Decoded" className="w-full h-full object-cover" />
        </div>
      )}
      <Footer />
    </div>
  );
}