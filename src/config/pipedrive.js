import axios from "axios";

export const pipedrive_api_url = axios.create({
  host: `${process.env.PIPEDRIVE_HOST}/api/v2`,
  apiKey: process.env.PIPEDRIVE_API_KEY,
});
