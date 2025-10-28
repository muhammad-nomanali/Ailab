import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', requests: 25 },
  { month: 'Feb', requests: 40 },
  { month: 'Mar', requests: 35 },
  { month: 'Apr', requests: 50 },
  { month: 'May', requests: 30 },
  { month: 'Jun', requests: 45 },
];

const General = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
        <p className="text-gray-500">Overview of lab and equipment activity</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Lab Equipment",
            value: "340",
            change: "+3.2%",
            color: "bg-blue-100 text-blue-700",
          },
          {
            label: "Approved Lab Slots",
            value: "128",
            change: "+12.5%",
            color: "bg-green-100 text-green-700",
          },
          {
            label: "Pending Approvals",
            value: "16",
            change: "-4.1%",
            color: "bg-yellow-100 text-yellow-700",
          },
          {
            label: "Product Requests",
            value: "42",
            change: "+7.9%",
            color: "bg-purple-100 text-purple-700",
          },
        ].map((item, i) => (
          <div key={i} className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
            <div className="text-sm text-gray-500">{item.label}</div>
            <div className="text-2xl font-bold text-gray-800">{item.value}</div>
            <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded ${item.color}`}>
              {item.change}
            </span>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Lab Slot Requests (Last 6 Months)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="requests" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Equipment Requests</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>Microscope (Dept. Biology) — Pending</li>
            <li>3D Printer (Mech Eng.) — Approved</li>
            <li>PH Meter (Chemistry) — In Review</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Lab Slot Approvals</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>Slot A - Physics Lab (10:00–12:00) — Approved</li>
            <li>Slot B - CS Lab (12:30–2:30) — Pending</li>
            <li>Slot C - Chemistry Lab (3:00–5:00) — Approved</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default General;
