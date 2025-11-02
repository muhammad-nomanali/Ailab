import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../supabaseclient";

export default function EquipmentDetail() {
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      setEquipment(data);
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">

        {/* Image */}
        <img
          src={equipment?.image_url}
          alt={equipment?.name}
          className="w-full h-80 object-cover"
        />

        {/* Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-3 text-gray-800">{equipment?.name}</h1>

          <p className="text-sm text-gray-500 mb-1">
            Uploaded: {new Date(equipment?.created_at).toLocaleString()}
          </p>

          <span
            className={`inline-block px-4 py-2 mt-2 mb-4 rounded-full text-sm font-semibold ${
              equipment?.status === "Available"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {equipment?.status}
          </span>

          <p className="text-gray-700 leading-relaxed mb-6">
            {equipment?.content}
          </p>

          <Link
            to="/lab2"
            className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Lab
          </Link>
        </div>
      </div>
    </div>
  );
}
