"use client";

//x
import { useState } from "react";
import Link from "next/link";
import { PinataSDK } from "pinata-web3";

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
      if (!response.contentType || !response.data) {
        alert("The CID does not point to an image.");
        return;
      }
      if (response.contentType.startsWith("image/")) {
        const blob = new Blob([response.data], { type: response.contentType });
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } else {
        alert("The CID does not point to an image.");
      }
    } catch (error) {
      console.error("Error fetching from Pinata:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1>Image Decoder</h1>
      <input
        type="text"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
        placeholder="Enter CID"
        className="mb-4 p-2 text-black"
      />
      <button
        onClick={decodeFromPinata}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Authenticate
      </button>
      {imageSrc && (
        <img src={imageSrc} alt="Decoded from Pinata" className="mt-4" />
      )}
      <Link href="./">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Upload Image
        </button>
      </Link>
    </div>
  );
}