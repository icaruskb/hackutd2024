import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="text-xl mb-4">Enter Image Name</h1>
      <div className="border-2 border-blue-500 w-64 h-64 flex items-center justify-center mb-4">
        <span className="text-gray-500">Upload Image</span>
      </div>
      <div className="flex gap-4">
        <button className="bg-green-500 text-black px-4 py-2 rounded">Reveal</button>
        <button className="bg-red-500 text-black px-4 py-2 rounded">Burn</button>
      </div>
    </div>
  );
}
