import "dotenv/config";
import { tweet, uploadImage } from "./twitter";

const tweet_test = async () => {
  try {
    const tokenId = 95000351;

    // Hack to convert 95000337 to 337 (prefixed 95 is project id inside of tokenId)
    const venetianNumber = tokenId % 10000;

    // Upload art blocks image to use media id with tweet
    const media_id = await uploadImage(
      `https://api.artblocks.io/image/${tokenId}`
    );

    await tweet(
      `CryptoVenetian #${venetianNumber} minted by 0x1Cfc86971F85CfA62acaD0d6d874D2d396Cb92Fb\n\nhttps://artblocks.io/token/${tokenId}`,
      media_id
    );
  } catch (error) {
    console.error(error);
  }
};

tweet_test();
