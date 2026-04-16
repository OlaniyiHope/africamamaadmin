import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, CalendarHeart } from "lucide-react";
import Layout from "../../Components/Layout/Layout";

/* ─── Helpers ─── */
const fmt = (val) =>
  val != null
    ? `£${Number(val).toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "—";

const fmtDate = (val) =>
  val ? new Date(val).toLocaleDateString("en-GB", { dateStyle: "medium" }) : "—";

const StatusBadge = ({ value }) => {
  const map = {
    paid:        "bg-green-100 text-green-700",
    pending:     "bg-yellow-100 text-yellow-700",
    failed:      "bg-red-100 text-red-700",
    confirmed:   "bg-green-100 text-green-700",
    cancelled:   "bg-red-100 text-red-700",
    processing:  "bg-blue-100 text-blue-700",
    delivered:   "bg-green-100 text-green-700",
  };
  const key = (value || "").toLowerCase();
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${map[key] || "bg-gray-100 text-gray-500"}`}>
      {value || "—"}
    </span>
  );
};

const SkeletonRows = ({ cols, rows = 5 }) =>
  Array.from({ length: rows }).map((_, i) => (
    <tr key={i}>
      {Array.from({ length: cols }).map((__, j) => (
        <td key={j} className="px-6 py-4">
          <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
  ));

const EmptyRow = ({ cols, label }) => (
  <tr>
    <td colSpan={cols} className="py-12 text-center text-gray-400 text-sm">
      {label}
    </td>
  </tr>
);

/* ─── Recent Orders ─── */
const RecentOrders = ({ orders, loading, onView }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-10">
    <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-white">
      <ShoppingBag className="w-4 h-4 text-purple-500" />
      <h2 className="text-base font-semibold text-gray-800">Recent Orders</h2>
      <span className="ml-auto text-xs text-gray-400">Latest 5</span>
    </div>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {["Product", "Order ID", "Customer", "Total", "Payment", "Status", "Actions"].map((h) => (
            <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {loading ? (
          <SkeletonRows cols={7} />
        ) : orders.length === 0 ? (
          <EmptyRow cols={7} label="No recent orders found." />
        ) : (
          orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
              {/* Product */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {order.items?.map((i) => i.name).join(", ") || "—"}
                </div>
                <div className="text-xs text-gray-400">{order.items?.length} item(s)</div>
              </td>

              {/* Order ID */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-xs font-mono text-gray-500">
                  #{order._id.slice(-8).toUpperCase()}
                </div>
                <div className="text-xs text-gray-400">{fmtDate(order.createdAt)}</div>
              </td>

              {/* Customer */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {order.billingAddress?.firstName} {order.billingAddress?.lastName}
                </div>
                <div className="text-xs text-gray-400">{order.email}</div>
              </td>

              {/* Total */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                {fmt(order.total)}
              </td>

              {/* Payment Status */}
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge value={order.paymentStatus} />
              </td>

              {/* Order Status */}
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge value={order.status} />
              </td>

              {/* Action */}
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onView(`/admin/orders/${order._id}`)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

/* ─── Recent Bookings ─── */
const RecentBookings = ({ bookings, loading, onView }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
    <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-white">
      <CalendarHeart className="w-4 h-4 text-pink-500" />
      <h2 className="text-base font-semibold text-gray-800">Recent Bookings</h2>
      <span className="ml-auto text-xs text-gray-400">Latest 5</span>
    </div>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {["Client", "Event Type", "Event Date", "Guests", "Venue", "Status", "Actions"].map((h) => (
            <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {loading ? (
          <SkeletonRows cols={7} />
        ) : bookings.length === 0 ? (
          <EmptyRow cols={7} label="No recent bookings found." />
        ) : (
          bookings.map((booking) => (
            <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
              {/* Client */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                <div className="text-xs text-gray-400">{booking.email}</div>
                <div className="text-xs text-gray-400">{booking.phone}</div>
              </td>

              {/* Event Type */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.eventType || "—"}
              </td>

              {/* Event Date */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {booking.date
                    ? new Date(booking.date).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                      })
                    : "—"}
                </div>
                <div className="text-xs text-gray-400">
                  Booked: {fmtDate(booking.createdAt)}
                </div>
              </td>

              {/* Guests */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.guests || "—"}
              </td>

              {/* Venue */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.location || "—"}
              </td>

              {/* Status */}
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge value={booking.status} />
              </td>

              {/* Action */}
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onView(`/admin/bookings/${booking._id}`)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

/* ─── Main Page ─── */
const UserTable = () => {
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const BASE = import.meta.env.VITE_BASE_URL;

    Promise.all([
      fetch(`${BASE}/payment/orders`).then((r) => r.json()),
      fetch(`${BASE}/bookings`).then((r) => r.json()),
    ])
      .then(([ordersData, bookingsData]) => {
        const allOrders  = Array.isArray(ordersData)  ? ordersData  : [];
        const allBookings = Array.isArray(bookingsData) ? bookingsData : [];

        // Sort newest first, keep latest 5
        const latest5 = (arr) =>
          [...arr]
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
            .slice(0, 5);

        setOrders(latest5(allOrders));
        setBookings(latest5(allBookings));
      })
      .catch((err) => console.error("Dashboard fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="w-full px-3 lg:px-[8rem] py-8">
        <RecentOrders  orders={orders}    loading={loading} onView={navigate} />
        <RecentBookings bookings={bookings} loading={loading} onView={navigate} />
      </div>
    </div>
  );
};

export default UserTable;