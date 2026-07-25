import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

export function RevenueChart({ data }) {
  return (
    <div className="bg-white rounded-xl2 shadow-card p-6">
      <h2 className="font-display text-xl text-forest-800 mb-5">
        Monthly Revenue
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip formatter={(v) => [`₹${v}`, "Revenue"]} />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#15803d"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function OrdersChart({ data }) {
  return (
    <div className="bg-white rounded-xl2 shadow-card p-6">
      <h2 className="font-display text-xl text-forest-800 mb-5">
        Monthly Orders
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="orders"
              radius={[6, 6, 0, 0]}
              fill="#16a34a"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
