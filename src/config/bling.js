import axios from "axios";

export const bling_api_url = axios.create({
  host: `${process.env.BLING_HOST}/api/v1`,
  apiKey: process.env.BLING_API_KEY,
});
