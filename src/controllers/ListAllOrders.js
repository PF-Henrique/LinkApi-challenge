import { ordersPerDate } from "../repositories/orderRepository";

class ListAllOrders {
  async index(req, res) {
    try {
      const orders = await ordersPerDate();
      return res.json(orders);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error" });
    }
  }
}

export default new ListAllOrders();
