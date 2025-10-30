import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseclient";
import { motion } from "framer-motion";
import Line from "../assets/Line.png";

export default function Lab2() {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEquipments = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setEquipments(data);
    } catch (err) {
      console.error("Error fetching equipments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();

    const channel = supabase
      .channel("realtime-posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setEquipments((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setEquipments((prev) =>
              prev.map((item) => (item.id === payload.new.id ? payload.new : item))
            );
          } else if (payload.eventType === "DELETE") {
            setEquipments((prev) => prev.filter((item) => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-[#003a70] text-white py-10 text-center shadow-lg"
      >
        <h1 className="text-4xl font-extrabold tracking-tight">Lab Equipments Gallery</h1>
        <p className="text-blue-100 text-sm mt-2">View all lab equipment uploaded by your team</p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center mt-6"
      >
        <img src={Line} alt="divider" className="w-40 opacity-80" />
      </motion.div>

      <section className="p-6 max-w-4xl mx-auto">
        {loading ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-500 mt-20">
            Loading equipments...
          </motion.p>
        ) : equipments.length === 0 ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-500 mt-20">
            No equipments found. Upload one to get started!
          </motion.p>
        ) : (
          // === VERTICAL LIST: single column (cards stacked) ===
          <motion.div
            className="flex flex-col gap-6 mt-8"
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
          >
            {equipments.map((item) => (
              <motion.div
                key={item.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 180 }}
                className="flex flex-col md:flex-row bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300"
              >
                {/* Left: Image (fixed height) */}
                <div className="md:w-1/3 w-full h-56 md:h-auto overflow-hidden flex-shrink-0">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.content || "Equipment"}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}
                </div>

                {/* Right: Content */}
                <div className="md:w-2/3 w-full p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {item.name || "Unnamed Equipment"}
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                          Updated{" "}
                          {item.created_at
                            ? new Date(item.created_at).toLocaleString("en-US", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })
                            : "—"}
                        </p>
                      </div>

                      {/* Status badge on the right (desktop) */}
                      <div className="hidden md:flex items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "Available"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Not Available"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {item.status || "Unknown"}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed mt-3">{item.content || "No description available."}</p>
                  </div>

                  {/* Mobile status + actions row */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="md:hidden">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Available"
                            ? "bg-green-100 text-green-800"
                            : item.status === "Not Available"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.status || "Unknown"}
                      </span>
                    </div>

                
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-6 bg-gray-100 text-sm text-gray-500 mt-12"
      >
        © {new Date().getFullYear()} Lab Management System — All rights reserved.
      </motion.footer>
    </div>
  );
}