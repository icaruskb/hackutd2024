import { PinataSDK } from "pinata";
const fs = require("fs")
const { Blob } = require("buffer")

const pinata = new PinataSDK({
    pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMTNkODgxMS1lZDY0LTRhOWQtYjg0Ni03YTY1NTYzOWZiMWIiLCJlbWFpbCI6InRyZXZyZDIyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmMDkxNWRhYzJhMTc1NDlhNjgwYiIsInNjb3BlZEtleVNlY3JldCI6IjQzYTQ4M2NlNDQwOTk5NjVjYmRjYmFlM2IzYzI1YjZlNDQxZTFjN2FmMzRmY2NmYmYxODNiODU4ZDU0ZWI3NWYiLCJleHAiOjE3NjMzMjM0MDd9.tlwlALp9nAGcn9vtNhS5AVc3Yo3gpqK2Upu1Kq31r0E",
    pinataGateway: "fuchsia-hilarious-manatee-395.mypinata.cloud",
});

const blob = new Blob([fs.readFileSync("/Users/trevordrummond/Desktop/a1.png")]);
const imageFile = new File([blob], "imageFile.png", { type: "image/png"})
const upload = await pinata.upload.file(imageFile);

const file = await pinata.gateways.get(upload.cid);

console.log(file.data);