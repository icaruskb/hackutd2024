import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT!,
    pinataGateway: "example-gateway.mypinata.cloud",
});

async function main() {
  try {
    const data = await pinata.gateways.get("bafkreibm6jg3ux5qumhcn2b3flc3tyu6dmlb4xa7u5bf44yegnrjhc4yeq");
    console.log(data)

    const url = await pinata.gateways.createSignedURL({
       	cid: "bafkreib4pqtikzdjlj4zigobmd63lig7u6oxlug24snlr6atjlmlza45dq",
    	expires: 1800,
    })
    console.log(url)

  } catch (error) {
    console.log(error);
  }
}

main();