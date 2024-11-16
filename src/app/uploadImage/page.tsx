"use client";

import { useState } from "react";
import { PinataSDK } from "pinata";
import Link from "next/link"


const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxM2UzZDlmMi01ZDhhLTRkODktYWU5Ny1hM2MyYzBlOTE1MTAiLCJlbWFpbCI6InJhcGhhZWxqY28wOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzc0MDNjNGNmZmY4NzU4NTE3MjUiLCJzY29wZWRLZXlTZWNyZXQiOiIzN2U1NGFiZjQxYTU5ZGQyZWUzMWVjYjE5OWNlNzkzMjcwYmMyMGJlYjRhZTllYWZkZWFjMDc0NmZkYjVmM2E0IiwiZXhwIjoxNzYzMzMxNjE4fQ.AAxb2vOqRvL5wjPxttjZ2cozwEVN59Hq0TKwQosZ_Q8";

export default function uploadImage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1>help</h1>

      <Link href="./">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Upload Image
        </button>
      </Link>
    </div>

  );
}
