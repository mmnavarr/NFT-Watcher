import "dotenv/config";
import { BigNumber, ethers } from "ethers";
import contractABI from "./abis/artBlocks.json";
import { tweet, uploadImage } from "./twitter";

// Configure provider
const isProduction = process.env.NODE_ENV === "production";
const network = isProduction ? "homestead" : "rinkeby";
const provider = new ethers.providers.AlchemyProvider(
  network,
  isProduction
    ? process.env.ALCHEMY_MAINNET_URL
    : process.env.ALCHEMY_RINKEBY_URL
);
const contractAddress = isProduction
  ? "0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270"
  : "0x152eee3dcc5526efd646e9b45c9a9672bffcc097";
const CV_PROJECT_ID = 95;

type MintEventArgs = [string, BigNumber, BigNumber];

const listenForArtBlocksMint = async () => {
  try {
    // const network = await provider.getNetwork();
    // console.log("🚀 ~ file: main.ts ~ line 24 ~ main ~ network", network);
    // const blockNumber = await provider.getBlockNumber();
    // console.log(
    //   "🚀 ~ file: index.ts ~ line 9 ~ main ~ blockNumber",
    //   blockNumber
    // );

    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    contract.on("Mint", async (_, __, ___, event: any) => {
      console.log(`NFT minted w/ event=${JSON.stringify(event)}`);
      const [to, _tokenId, _projectId]: MintEventArgs = event.args;

      // Get token an project id from event args
      const tokenId = _tokenId.toNumber();
      const projectId = _projectId.toNumber();

      // Hack to convert 95000337 to 337 (prefixed 95 is project id inside of tokenId)
      const realTokenId = tokenId % 10000;

      // console.log(
      //   "🚀 ~ file: index.ts ~ line 28 ~ contract.on ~ [to, tokenId, projectId]",
      //   [to, tokenId, projectId]
      // );

      if (projectId == CV_PROJECT_ID) {
        console.log("CV Minted!");

        // Upload art blocks image to use media id with tweet
        const media_id = await uploadImage(
          `https://api.artblocks.io/image/${tokenId}`
        );

        await tweet(
          `CryptoVenetian #${realTokenId} minted by ${to}\n\nhttps://artblocks.io/token/${tokenId}`,
          media_id
        );
      } else {
        console.log("Non-CV Minted!");
      }
    });

    console.log("Listening to mint event");
  } catch (error) {
    console.error("Error:", error);
  }
};

export default listenForArtBlocksMint;
