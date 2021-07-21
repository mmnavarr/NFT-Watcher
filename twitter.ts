import "dotenv/config";
import imageToBase64 from "image-to-base64";
import Twitter from "twitter-lite";

const CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY ?? "ERR";
const CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET ?? "ERR";
const ACCESS_TOKEN_KEY = process.env.TWITTER_ACCESS_TOKEN_KEY ?? "ERR";
const ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET ?? "ERR";

const client = new Twitter({
  subdomain: "api", // "api" is the default (change for other subdomains)
  version: "1.1", // version "1.1" is the default (change for other subdomains)
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN_KEY,
  access_token_secret: ACCESS_TOKEN_SECRET,
});
const upload = new Twitter({
  subdomain: "upload",
  version: "1.1", // version "1.1" is the default (change for other subdomains)
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN_KEY,
  access_token_secret: ACCESS_TOKEN_SECRET,
});

export const tweet = async (status: string, media_ids?: string) => {
  try {
    const tweet = await client.post("statuses/update", { status, media_ids });
    if (tweet) {
      console.log(`Tweet (#${tweet.id_str}) successful!`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const uploadImage = async (imageUrl: string) => {
  try {
    const image = await imageToBase64(imageUrl);

    const { media_id_string } = await upload.post("media/upload", {
      media: image,
    });

    return media_id_string;
  } catch (error) {
    console.error(error);
  }
};
