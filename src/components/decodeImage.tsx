"use client";

//x
import { useState } from "react";
import Link from "next/link";
import { PinataSDK } from "pinata-web3";
import { PageTransition } from '@/components/PageTransition';


const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxM2UzZDlmMi01ZDhhLTRkODktYWU5Ny1hM2MyYzBlOTE1MTAiLCJlbWFpbCI6InJhcGhhZWxqY28wOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzc0MDNjNGNmZmY4NzU4NTE3MjUiLCJzY29wZWRLZXlTZWNyZXQiOiIzN2U1NGFiZjQxYTU5ZGQyZWUzMWVjYjE5OWNlNzkzMjcwYmMyMGJlYjRhZTllYWZkZWFjMDc0NmZkYjVmM2E0IiwiZXhwIjoxNzYzMzMxNjE4fQ.AAxb2vOqRvL5wjPxttjZ2cozwEVN59Hq0TKwQosZ_Q8";

const pinata = new PinataSDK({
  pinataJwt: JWT,
  pinataGateway: "plum-immediate-parrotfish-603.mypinata.cloud",
});

export default function DecodeImage() {
  const [cid, setCid] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const decodeFromPinata = async () => {
    if (!cid) {
      alert("Please Enter a CID");
      return;
    }

    try {

      const response = await pinata.gateways.get(cid);
      if (response.contentType && response.contentType.startsWith("image/")) {
        // Check if response.data is a Blob or ArrayBuffer
        let data: BlobPart;

        if (response.data instanceof Blob) {
          data = response.data; // If it's already a Blob, use it directly
        } else if (typeof response.data === "string") {
          data = new Blob([response.data], { type: response.contentType }); // Convert string to Blob
        } else {
          // If it's JSON or another type, handle accordingly
          console.error("Unexpected data type:", typeof response.data);
          alert("The CID does not point to a valid image.");
          return;
        }

        const blob = new Blob([data], { type: response.contentType });
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } else {
        alert("The CID does not point to an image or content type is invalid.");
      }
    } catch (error) {
      console.error("Error fetching from Pinata:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <PageTransition>
      <h1>Image Decoder</h1>
      <input
        type="text"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        placeholder="Enter CID"
        className="mb-4 p-2 bg-gray-800 text-white border border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={decodeFromPinata}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
      >
        Decode
      </button>
      {imageSrc && (
        <img src={imageSrc} alt="Decoded from Pinata" className="mt-4" />
      )}
      <Link href="./">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Upload Image
        </button>
      </Link>
      </PageTransition>
    </div>
  );
}