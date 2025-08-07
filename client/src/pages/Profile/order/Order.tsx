import * as React from "react";
import ProfileContentContainer from "../container/ProfileContentContainer";

export default function Order() {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {

  }, [])

  return (
    <ProfileContentContainer title="View Orders">
      <table className="text-white min-w-full border border-gray-200 table-fixed">
        <thead className="border border-gray-200 text-left">
          <tr className="border border-gray-200">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Phone Number</th>
            <th className="border p-2">Drop Location</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">id</td>
            <td className="border p-2">user</td>
            <td className="border p-2">phone</td>
            <td className="border p-2">location</td>
            <td className="border p-2">date</td>
            <td className="border p-2">time</td>
            <td className="border p-2">toatl</td>
          </tr>
        </tbody>
      </table>
    </ProfileContentContainer>
  )
}
