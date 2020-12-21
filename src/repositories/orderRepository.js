import Order from "../models/Order";

export async function saveOrder(orders) {
  const savedOrders = await orders.map(
    async ({ numero, idPedido, volumes, value, orgName }) => {
      const order = await Order.create({
        numero,
        idPedido,
        volumes,
        value,
        orgName,
      });
      return order;
    }
  );
}
export async function ordersPerDate() {
  const orders = await Order.aggregate([
    {
      $sort: {
        value: -1,
        numero: 1,
      },
    },
    {
      $project: {
        numero: "$numero",
        idPedido: "$idPedido",
        volumes: "$volumes",
        value: "$value",
        orgName: "$orgName",
        date: { $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
      },
    },
    {
      $group: {
        _id: "$date",
        orders: {
          $push: "$$ROOT",
        },
      },
    },
  ]);

  return orders;
}
