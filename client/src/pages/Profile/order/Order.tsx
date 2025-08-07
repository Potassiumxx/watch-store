import * as React from "react";
import ProfileContentContainer from "../container/ProfileContentContainer";
import { getAllOrders, getSpecificOrder } from "../../../services/api/orderAPI";
import { OrderResponseDTO } from "../../../types/orderType";
import { useUserStore } from "../../../store/userStore";
import { ROLES } from "../../../utils/constants";
import { useAuthStore } from "../../../store/authStore";

export default function Order() {
  const [orders, setOrders] = React.useState<OrderResponseDTO[]>([]);
  const [expandedOrderId, setExpandedOrderId] = React.useState<number | null>(null);

  const { role, userID } = useUserStore();

  const isJWTChecked = useAuthStore((state) => state.isJWTChecked);

  function toggleShowOrderItems(orderId: number) {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  }


  async function fetchAllOrders() {
    try {
      const data = await getAllOrders();
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSpecificOrder() {
    try {
      const data = await getSpecificOrder(userID);
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if (!isJWTChecked) return;

    if (role === ROLES.ADMIN) fetchAllOrders();
    else fetchSpecificOrder();
  }, [isJWTChecked])

  if (orders.length === 0) return <h1 className="text-4xl mt-20 mx-auto text-white">No orders history to show</h1>

  return (
    <ProfileContentContainer title="View Orders">
      <table className="text-white min-w-full border border-gray-400 bg-black/[.7] table-fixed">
        <thead className="text-left text-[15px] text-bold bg-white/[.2]">
          <tr className="p-4">
            <th className="p-2">#</th>
            <th className="p-2">Order ID</th>
            {role === ROLES.ADMIN && <th className="p-2 w-[400px]">User Email</th>}
            <th className="p-2">Date (D/M/Y)</th>
            <th className="p-2">Time (24h)</th>
            <th className="p-2">Total</th>
            <th className="p-2 w-[200px]">Action</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {
            orders.map((order, index) => {
              const totalPrice = order.orderItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
              return (
                <React.Fragment key={order.orderID}>
                  <tr className="border-b border-gray-400">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{order.orderID}</td>
                    {role === ROLES.ADMIN && <td className="p-2 overflow-x-auto">{order.userEmail}</td>}
                    <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-2">{new Date(order.createdAt).toLocaleTimeString()}</td>
                    <td className="p-2">{totalPrice}</td>
                    <td className="p-2">
                      <button
                        onClick={() => toggleShowOrderItems(order.orderID)}
                        className="border px-4 py-2 hover:bg-white hover:text-black duration-200">
                        {expandedOrderId === order.orderID ? " Hide Details" : "Show Details"}
                      </button>
                    </td>
                  </tr>
                  {expandedOrderId === order.orderID && (
                    <tr>
                      <td colSpan={role === ROLES.ADMIN ? 9 : 8} className="p-4">
                        <div className="grid grid-cols-[2fr_1fr]">
                          <div className="">
                            <strong>Items:</strong>
                            <ul className="list-dash list-inside pl-4 mt-1">
                              {order.orderItems.map((item) => (
                                <li key={item.productId}>
                                  {item.productName} | Quantity: {item.quantity} | Price: {item.unitPrice}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex flex-col gap-8 ml-auto">
                            <div className="mb-2">
                              <strong>Phone Number:</strong> {order.phoneNumber}
                            </div>
                            <div className="mb-2">
                              <strong>Drop Location:</strong> {order.dropLocation}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            }
            )
          }
        </tbody>
      </table>
    </ProfileContentContainer >
  )
}
