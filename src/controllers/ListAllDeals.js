import { get } from "axios";

import pipedrive_api_url from "../config/pipedrive";
const pipedriveAPIToken = process.env.PIPEDRIVE_API_TOKEN;

class ListAllDeals {
  async index(req, res) {
    try {
      const response = await get(
        `${pipedrive_api_url}/deals?api_token=${pipedriveAPIToken}`
      );
      return res.json(response.data);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error" });
    }
  }
}

export default new ListAllDeals();
