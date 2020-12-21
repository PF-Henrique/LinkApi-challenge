import { get } from "axios";
import orderRepository from "../repositories/orderRepository";
import CreateOrderService from "../services/createOrder";

const pipedriveAPIToken = process.env.PIPEDRIVE_API_TOKEN;

class ListWonDeals {
  async index(req, res) {
    try {
      const response = await get(
        `https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=${pipedriveAPIToken}`
      );
      const { data } = response.data;

      return res.json(data);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error" });
    }
  }

  async getWonDeals() {
    try {
      const response = await get(
        `https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=${pipedriveAPIToken}`
      );
      const { data } = response.data;

      return data;
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error" });
    }
  }
}

export default new ListWonDeals();
