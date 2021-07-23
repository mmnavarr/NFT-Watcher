import imageToBase64 from "image-to-base64";
import { StatusesUpdateParams, TwitterClient } from "twitter-api-client";

const CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY ?? "ERR";
const CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET ?? "ERR";
const ACCESS_TOKEN_KEY = process.env.TWITTER_ACCESS_TOKEN_KEY ?? "ERR";
const ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET ?? "ERR";

const t = new TwitterClient({
  apiKey: CONSUMER_KEY,
  apiSecret: CONSUMER_SECRET,
  accessToken: ACCESS_TOKEN_KEY,
  accessTokenSecret: ACCESS_TOKEN_SECRET,
});

export const tweet = async (status: string, media_ids?: string) => {
  try {
    const tweet = await t.tweets.statusesUpdate({
      status,
      media_ids,
    } as StatusesUpdateParams);

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

    const { media_id_string } = await t.media.mediaUpload({
      media: image,
    });

    return media_id_string;
  } catch (error) {
    console.error(error);
  }
};
