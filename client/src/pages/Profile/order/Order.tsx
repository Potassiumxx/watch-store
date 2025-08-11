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
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const itemsPerPage = 5;

  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    return (
      order.orderID.toString().includes(query) ||
      order.userEmail?.toLowerCase().includes(query) ||
      order.dropLocation?.toLowerCase().includes(query) ||
      order.phoneNumber?.toLowerCase().includes(query) ||
      order.orderItems.some(item => item.productName?.toLowerCase().includes(query))
    );
  });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const { role, userID } = useUserStore();

  const isJWTChecked = useAuthStore((state) => state.isJWTChecked);


  function toggleShowOrderItems(orderId: number) {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  }

  async function fetchAllOrders() {
    try {
      const data = await getAllOrders();
      setOrders(data);
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
  }, [isJWTChecked]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (orders.length === 0) return <h1 className="text-4xl mt-20 mx-auto text-white">No orders history to show</h1>

  return (
    <ProfileContentContainer title="View Orders">
      <div className="flex flex-col gap-10 w-full">
        <div>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2 lg:px-4 py-2 border rounded w-full text-black"
          />
        </div>
        <div className="innerDivBackgroundColour border border-white/[.5] pb-4 rounded-md shadow-lg shadow-black min-h-[420px] flex flex-col justify-between w-full overflow-x-auto px-2">
          <table className="text-white min-w-full table-auto md:table-fixed">
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
                paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={role === ROLES.ADMIN ? 7 : 6} className="text-center py-20 text-4xl">
                      No orders found.
                    </td>
                  </tr>
                ) :
                  paginatedOrders.map((order, index) => {
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
                            <td colSpan={role === ROLES.ADMIN ? 7 : 6} className="p-4">
                              <div className="grid grid-cols-[2fr_1fr] border-b">
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
          <div className="flex justify-center items-center mt-4 gap-4">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 border text-white rounded hover:bg-white hover:text-black disabled:opacity-50 duration-200"
            >
              Previous
            </button>
            <span className="text-white">Page {currentPage} of {totalPages <= 0 ? totalPages + 1 : totalPages}</span>
            <button
              disabled={currentPage === totalPages || totalPages <= 1}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 border text-white rounded hover:bg-white hover:text-black disabled:opacity-50 duration-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </ProfileContentContainer >
  )
}
