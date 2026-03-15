import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronDown } from "lucide-react";
import Layout from "../../Components/Layout/Layout";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/payment/orders`)
      .then(res => res.json())
      .then(data => { setOrders(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const filtered = orders.filter(order =>
    order._id.toLowerCase().includes(search.toLowerCase()) ||
    order.email?.toLowerCase().includes(search.toLowerCase()) ||
    order.items?.some(i => i.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Layout>
      <div className="w-full px-3 lg:px-[8rem]">
        <div className="px-4 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-800">All Orders</h1>
          <p className="text-gray-600 mt-1">View and manage all orders paid and unpaid</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by order ID, email or product..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-400">
                    Loading orders...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.items?.map(i => i.name).join(", ")}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.items?.length} item(s)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono">
                        #{order._id.slice(-8).toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.billingAddress?.firstName} {order.billingAddress?.lastName}
                      </div>
                      <div className="text-xs text-gray-400">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        £{Number(order.total).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.items?.reduce((s, i) => s + i.quantity, 0)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        order.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        order.status === "processing" ? "bg-blue-100 text-blue-700" :
                        order.status === "delivered" ? "bg-green-100 text-green-700" :
                        order.status === "cancelled" ? "bg-red-100 text-red-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => navigate(`/admin/orders/${order._id}`)}
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
      </div>
    </Layout>
  );
};

export default OrderList;