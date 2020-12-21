import axios from "axios";
import { saveOrder } from "../repositories/orderRepository";
import { create as _create } from "../services/createOrder";
import { getWonDeals } from "./ListWonDeals";

class CreateOrder {
  async create(req, res) {
    try {
      const response = await getWonDeals();

      const orders = await _create(response);
      console.log(orders.filter(Boolean));

      await saveOrder(orders);

      return res.json(orders);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error" });
    }
  }
}

export default new CreateOrder();
