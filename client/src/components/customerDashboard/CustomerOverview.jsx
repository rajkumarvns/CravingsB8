import React, { useEffect, useState } from "react";

const CustomerOverview = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("mockOrders");
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const recent = orders.slice(0, 3);

  return (
    <div className="overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-6">Overview</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-(--color-base-200) p-4 rounded-lg">
          <p className="text-(--color-neutral) text-sm">Total Orders</p>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-(--color-base-200) p-4 rounded-lg">
          <p className="text-(--color-neutral) text-sm">Total Spent</p>
          <p className="text-3xl font-bold">${totalSpent.toFixed(2)}</p>
        </div>
      </div>
      <div className="bg-(--color-base-200) p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Recent Orders</h3>
        {recent.length === 0 ? (
          <p className="text-(--color-neutral) text-sm">No recent orders</p>
        ) : (
          <ul>
            {recent.map((o) => (
              <li key={o.id} className="py-2 border-b last:border-b-0">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{o.restaurant}</div>
                    <div className="text-xs text-(--color-neutral)">{o.id}</div>
                  </div>
                  <div className="text-right">
                    <div>${o.amount.toFixed(2)}</div>
                    <div className="text-xs text-(--color-neutral)">{o.status}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomerOverview;
