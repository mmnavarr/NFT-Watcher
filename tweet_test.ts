import "dotenv/config";
import Twitter from "twitter-lite";
import imageToBase64 from "image-to-base64";
import { tweet } from "./twitter";

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
  subdomain: "upload", // "api" is the default (change for other subdomains)
  version: "1.1", // version "1.1" is the default (change for other subdomains)
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token_key: ACCESS_TOKEN_KEY,
  access_token_secret: ACCESS_TOKEN_SECRET,
});

const traits = [
  {
    trait_type: "CryptoVenetian",
    value: "All CryptoVenetians",
  },
  {
    trait_type: "CryptoVenetian",
    value: "Time of day: High Noon",
  },
  {
    trait_type: "CryptoVenetian",
    value: "Accessory: Barbell",
  },
  {
    trait_type: "CryptoVenetian",
    value: "Tone: Light Roast",
  },
  {
    trait_type: "CryptoVenetian",
    value: "Footwear: DVS Skater Shoes",
  },
  {
    trait_type: "CryptoVenetian",
    value: "Bodywear: Business Casual",
  },
  {
    trait_type: "CryptoVenetian",
    value: "Facewear: Peepers",
  },
  {
    trait_type: "CryptoVenetian",
    value: "Headwear: The Errands Cap",
  },
];

const tweet_test = async () => {
  try {
    const image = await imageToBase64(
      "https://api.artblocks.io/image/95000337"
    );

    const { media_id_string } = await upload.post("media/upload", {
      media: image,
    });

    tweet(
      `CryptoVenetian #327 minted by 0x1Cfc86971F85CfA62acaD0d6d874D2d396Cb92Fb\n\nhttps://artblocks.io/token/95000337`,
      media_id_string
    );
  } catch (error) {
    console.error(error);
  }
};

tweet_test();
