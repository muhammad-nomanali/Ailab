import { useState } from "react";

const EquipmentsIsued = () => {
  const [equipments, setEquipments] = useState([
    {
      id: 1,
      name: "Microscope",
      department: "Biology",
      quantity: 5,
      image: "https://via.placeholder.com/60?text=Microscope",
    },
    {
      id: 2,
      name: "Spectrometer",
      department: "Chemistry",
      quantity: 3,
      image: "https://via.placeholder.com/60?text=Spectro",
    },
    {
      id: 3,
      name: "3D Printer",
      department: "Mechanical",
      quantity: 2,
      image: "https://via.placeholder.com/60?text=Printer",
    },
  ]);

  const handleDelete = (id) => {
    setEquipments(equipments.filter((eq) => eq.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit equipment with ID: ${id}`);
  };

  const handleAdd = () => {
    alert("Add new equipment");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Equipments Dashboard</h2>
        <p className="text-gray-500">Manage your lab equipment inventory.</p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add Equipment
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {equipments.map((eq, index) => (
              <tr key={eq.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <img
                    src={eq.image}
                    alt={eq.name}
                    className="w-12 h-12 object-cover rounded border"
                  />
                </td>
                <td className="px-4 py-3">{eq.name}</td>
                <td className="px-4 py-3">{eq.department}</td>
                <td className="px-4 py-3">{eq.quantity}</td>
                <td className="px-4 py-3 flex space-x-2">
                  <button
                    onClick={() => handleEdit(eq.id)}
                    className="px-3 py-1 text-xs bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(eq.id)}
                    className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {equipments.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No equipment available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentsIsued;
