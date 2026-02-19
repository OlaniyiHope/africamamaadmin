import { Users, Calendar, Home, TrendingUp } from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      title: "Total Users",
      value: "0",
      change: "+12.5%",
      trend: "up",
      icon: <Users className="w-6 h-6 text-white" />,
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      title: "Total Orders",
      value: "0",
      change: "+8.2%",
      trend: "up",
      icon: <Calendar className="w-6 h-6 text-white" />,
      gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
    {
      title: "Communities",
      value: "0",
      change: "+5.3%",
      trend: "up",
      icon: <Home className="w-6 h-6 text-white" />,
      gradient: "bg-gradient-to-r from-pink-500 to-pink-600",
    },
    {
      title: "Total Revenue",
      value: "$0K",
      change: "+22.4%",
      trend: "up",
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
    },
  ];

  return (
    <div className="px-3 lg:px-[8rem] py-6">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.gradient} rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                {stat.icon}
              </div>
              <span className="text-sm font-medium text-white bg-white/20 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-white/80">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
