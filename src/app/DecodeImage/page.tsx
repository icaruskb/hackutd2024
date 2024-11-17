"use client";

import { SetStateAction, useState } from "react";
import { PinataSDK } from "pinata";
import Link from "next/link"

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxM2UzZDlmMi01ZDhhLTRkODktYWU5Ny1hM2MyYzBlOTE1MTAiLCJlbWFpbCI6InJhcGhhZWxqY28wOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzc0MDNjNGNmZmY4NzU4NTE3MjUiLCJzY29wZWRLZXlTZWNyZXQiOiIzN2U1NGFiZjQxYTU5ZGQyZWUzMWVjYjE5OWNlNzkzMjcwYmMyMGJlYjRhZTllYWZkZWFjMDc0NmZkYjVmM2E0IiwiZXhwIjoxNzYzMzMxNjE4fQ.AAxb2vOqRvL5wjPxttjZ2cozwEVN59Hq0TKwQosZ_Q8";

export default function DecodeImage() {
<<<<<<< HEAD

=======
    const [cid, setCid] = useState("");
    const [imageSrc, setImageSrc] = useState(null);

    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
      setCid(e.target.value); // Update CID state with user input
    };

    // Function to fetch the image using the CID
    const fetchImage = async () => {
      if (!cid) {
        alert("Please enter a CID.");
        return;
      }

      try {
        const response = await fetch(`/api/getImage?cid=${encodeURIComponent(cid)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch image.");
        }

        const data = await response.json();
        if (data.imageUrl) {
          setImageSrc(data.imageUrl); // Set image URL to state
        } else {
          alert("No image found for the provided CID.");
          setImageSrc(null); // Clear any existing image
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        alert("Something went wrong. Please try again.");
      }
    }

    const burnImage = async () => {
      // implement burning the image
    }
>>>>>>> be54ff82d29d578680ebb7cd93ae3e9cd1bf3636

 return(
  <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      Enter your CID
<<<<<<< HEAD
      <input className="text-black" type="text" placeholder="Enter text here"/>

=======
      <input className="text-black" type="text" placeholder="Enter text here" />
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Burn
        </button>
>>>>>>> be54ff82d29d578680ebb7cd93ae3e9cd1bf3636
      <Link href="./">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Authenticate 
        </button>
      
        if response != cid 
        return try again
        else 
        return the image
        */
      </Link>
    </div>
 );
}