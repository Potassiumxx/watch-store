import * as React from "react";
import ProfileContentContainer from "../container/ProfileContentContainer";
import { getAllOrders } from "../../../services/api/orderAPI";
import { OrderResponseDTO } from "../../../types/orderType";

export default function Order() {
  const [orders, setOrders] = React.useState<OrderResponseDTO[]>([]);

  async function fetchAllOrders() {
    try {
      const data = await getAllOrders();
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchAllOrders();
  }, [])

  if (orders.length === 0) return <div className="txt-4xl text-center mt-20 text-white">No orders history to show</div>

  return (
    <ProfileContentContainer title="View Orders">
      <table className="text-white min-w-full border border-gray-200 table-auto w-full overflow-x-auto">
        <thead className="border border-gray-200 text-center overflow-x-auto">
          <tr className="border border-gray-200">
            <th className="border p-2 w-[80px]">Order ID</th>
            <th className="border p-2 w-[10px] overflow-x-auto">User</th>
            <th className="border p-2 w-[150px]">Phone Number</th>
            <th className="border p-2">Drop Location</th>
            <th className="border p-2 w-[120px]">Date (D/M/Y)</th>
            <th className="border p-2 w-[120px]">Time (24h)</th>
            <th className="border p-2 w-[180px]">Total</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {
            orders.map((order) => {
              const totalPrice = order.orderItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
              return (
                <tr key={order.orderID}>
                  <td className="border p-2">{order.orderID}</td>
                  <td className="border p-2 overflow-x-auto">{order.userEmail}</td>
                  <td className="border p-2">{order.phoneNumber}</td>
                  <td className="border p-2">{order.dropLocation}</td>
                  <td className="border p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="border p-2">{new Date(order.createdAt).toLocaleTimeString()}</td>
                  <td className="border p-2">{totalPrice}</td>
                </tr>
              )
            }
            )
          }
        </tbody>
      </table>
    </ProfileContentContainer>
  )
}
