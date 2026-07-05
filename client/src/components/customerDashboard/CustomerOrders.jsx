import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("mockOrders");
    if (stored) {
      setOrders(JSON.parse(stored));
    } else {
      const sample = [
        { id: "ORD-1001", restaurant: "Pizzaro", amount: 24.5, status: "Delivered", date: "2026-07-01" },
        { id: "ORD-1002", restaurant: "Burger Hub", amount: 12.99, status: "On the way", date: "2026-07-03" },
        { id: "ORD-1003", restaurant: "Sushi World", amount: 34.0, status: "Preparing", date: "2026-07-04" },
      ];
      setOrders(sample);
      sessionStorage.setItem("mockOrders", JSON.stringify(sample));
    }
  }, []);

  const updateOrderStatus = (orderId, status) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    sessionStorage.setItem("mockOrders", JSON.stringify(updated));
    toast.success(`Order ${orderId} marked ${status}`);
  };

  return (
    <div className="overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="bg-(--color-base-200) p-4 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-(--color-secondary)">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Restaurant</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr className="border-b border-(--color-secondary)">
                <td colSpan="6" className="text-center py-4 text-(--color-neutral)">
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-(--color-secondary)">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.restaurant}</td>
                  <td className="py-2">${order.amount.toFixed(2)}</td>
                  <td className="py-2">{order.status}</td>
                  <td className="py-2">{order.date}</td>
                  <td className="py-2">
                    {order.status !== "Delivered" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "Delivered")}
                        className="px-2 py-1 bg-(--color-primary) text-(--color-primary-content) rounded text-sm"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrders;
