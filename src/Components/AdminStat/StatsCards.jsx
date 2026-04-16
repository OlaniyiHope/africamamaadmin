import { useEffect, useState } from "react";
import { Users, ShoppingBag, CalendarHeart, TrendingUp, ArrowUpRight } from "lucide-react";

const StatsCards = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    bookings: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BASE = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("accessToken");

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${BASE}/users`, { headers }).then(r => r.json()),
      fetch(`${BASE}/payment/orders`).then(r => r.json()),
      fetch(`${BASE}/bookings`).then(r => r.json()),
    ])
      .then(([usersData, ordersData, bookingsData]) => {
        const users = Array.isArray(usersData.users) ? usersData.users : [];
        const orders = Array.isArray(ordersData) ? ordersData : [];
        const bookings = Array.isArray(bookingsData) ? bookingsData : [];

        const revenue = orders
          .filter(o => o.paymentStatus === "paid")
          .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

        setStats({
          users: users.length,
          orders: orders.length,
          bookings: bookings.length,
          revenue,
        });
      })
      .catch(err => console.error("Stats fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: loading ? "—" : stats.users.toLocaleString(),
      icon: <Users className="w-6 h-6 text-white" />,
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      title: "Total Orders",
      value: loading ? "—" : stats.orders.toLocaleString(),
      icon: <ShoppingBag className="w-6 h-6 text-white" />,
      gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
    {
      title: "Event Bookings",
      value: loading ? "—" : stats.bookings.toLocaleString(),
      icon: <CalendarHeart className="w-6 h-6 text-white" />,
      gradient: "bg-gradient-to-r from-pink-500 to-pink-600",
    },
    {
      title: "Total Revenue",
      value: loading ? "—" : `£${stats.revenue.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
    },
  ];

  return (
    <div className="px-3 lg:px-[8rem] py-6">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.gradient} rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                {card.icon}
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/60" />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-white/80">{card.title}</h3>
              <p className="text-2xl font-bold text-white mt-1">
                {loading ? (
                  <span className="inline-block w-16 h-7 bg-white/20 rounded animate-pulse" />
                ) : (
                  card.value
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;