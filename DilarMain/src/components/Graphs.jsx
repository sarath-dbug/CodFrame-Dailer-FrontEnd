import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const Graphs = () => {
  // Sample data - replace with real data
  const dailyCallData = [
    { date: "Mon", calls: 2400 },
    { date: "Tue", calls: 1398 },
    { date: "Wed", calls: 9800 },
    { date: "Thu", calls: 3908 },
    { date: "Fri", calls: 4800 },
    { date: "Sat", calls: 3800 },
    { date: "Sun", calls: 4300 }
  ];

  const successRateData = [
    { name: "Successful", value: 75 },
    { name: "Unsuccessful", value: 25 }
  ];

  const COLORS = ["#10B981", "#EF4444"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Daily Call Trends */}
      <div className=" p-8 bg-[#1E293B] rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-[#FFFFFF]">
          Daily Call Trends
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyCallData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#FFFFFF" }}
                axisLine={{ stroke: "#FFFFFF" }}
              />
              <YAxis
                tick={{ fill: "#FFFFFF" }}
                axisLine={{ stroke: "#FFFFFF" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.8)"
                }}
              />
              <Line
                type="monotone"
                dataKey="calls"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Call Success Rate */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Call Success Rate
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={successRateData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {successRateData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              />
              <Legend
                iconType="circle"
                wrapperStyle={{ paddingTop: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Graphs;