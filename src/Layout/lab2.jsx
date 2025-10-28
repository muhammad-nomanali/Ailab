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

    // ✅ Realtime updates
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
              prev.map((item) =>
                item.id === payload.new.id ? payload.new : item
              )
            );
          } else if (payload.eventType === "DELETE") {
            setEquipments((prev) =>
              prev.filter((item) => item.id !== payload.old.id)
            );
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
      {/* 🧭 Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-[#003a70] text-white py-10 text-center shadow-lg"
      >
        <h1 className="text-4xl font-extrabold tracking-tight">
          Lab Equipments Gallery
        </h1>
        <p className="text-blue-100 text-sm mt-2">
          View all lab equipment uploaded by your team
        </p>
      </motion.header>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center mt-6"
      >
        <img src={Line} alt="divider" className="w-40 opacity-80" />
      </motion.div>

      {/* 📦 Equipment Section */}
      <section className="p-6 max-w-6xl mx-auto">
        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-20"
          >
            Loading equipments...
          </motion.p>
        ) : equipments.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-20"
          >
            No equipments found. Upload one to get started!
          </motion.p>
        ) : (
          <motion.div
            className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {equipments.map((item, ) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                {item.image_url ? (
                  <motion.img
                    src={item.image_url}
                    alt={item.content || "Equipment"}
                    loading="lazy"
                    className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                <div className="p-4">
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {item.content || "No description available."}
                  </p>
                  <p className="text-xs text-gray-400 mt-3">
                    📅{" "}
                    {new Date(item.created_at).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* 🌙 Footer */}
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
