import { useState } from "react";

const Approvals = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      requester: "Ali Khan",
      lab: "Physics Lab",
      timeSlot: "10:00 - 12:00",
      status: "Pending",
    },
    {
      id: 2,
      requester: "Fatima Noor",
      lab: "Chemistry Lab",
      timeSlot: "01:00 - 03:00",
      status: "Approved",
    },
    {
      id: 3,
      requester: "Usman Tariq",
      lab: "CS Lab",
      timeSlot: "03:30 - 05:00",
      status: "Rejected",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Approvals Dashboard</h2>
        <p className="text-gray-500">Manage and respond to lab slot approval requests.</p>
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Requester</th>
              <th className="px-4 py-3">Lab</th>
              <th className="px-4 py-3">Time Slot</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {requests.map((req, index) => (
              <tr key={req.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{req.requester}</td>
                <td className="px-4 py-3">{req.lab}</td>
                <td className="px-4 py-3">{req.timeSlot}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      req.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : req.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => updateStatus(req.id, "Approved")}
                    className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(req.id, "Rejected")}
                    className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateStatus(req.id, "Pending")}
                    className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Reset
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No requests available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Approvals;
