import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseclient";
import { motion, AnimatePresence } from "framer-motion";
import Line from "../assets/Line.png";

// Suppress ESLint warning for motion
/* eslint-disable no-unused-vars */

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative bg-gradient-to-r from-[#003a70] via-[#004d8c] to-[#0066b3] text-white py-12 text-center shadow-2xl overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold tracking-tight relative z-10"
        >
          Lab Equipment Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-blue-100 text-base mt-3 relative z-10"
        >
          Explore cutting-edge laboratory equipment
        </motion.p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex justify-center mt-8"
      >
        <img src={Line} alt="divider" className="w-40 opacity-80" />
      </motion.div>

      <section className="p-6 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center mt-20 space-y-6"
            >
              <div className="relative">
                <motion.div
                  className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-indigo-400 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-gray-600 font-medium text-lg"
              >
                Loading equipment data...
              </motion.p>
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-blue-500 rounded-full"
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ) : equipments.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mt-20"
            >
              <div className="text-6xl mb-4">🔬</div>
              <p className="text-gray-500 text-lg">No equipment found. Upload one to get started!</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              className="flex flex-col gap-8 mt-10"
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            >
              {equipments.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative flex flex-col md:flex-row bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none z-10" />
                  
                  {/* Left: Image */}
                  <div className="md:w-2/5 w-full h-64 md:h-auto overflow-hidden flex-shrink-0 relative">
                    {item.image_url ? (
                      <>
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          src={item.image_url}
                          alt={item.content || "Equipment"}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-5xl mb-2">📷</div>
                          <p className="text-gray-400 text-sm">No Image</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Floating number badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center font-bold text-blue-600 shadow-lg"
                    >
                      {index + 1}
                    </motion.div>
                  </div>

                  {/* Right: Content */}
                  <div className="md:w-3/5 w-full p-7 flex flex-col justify-between relative z-20">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <motion.h2
                            whileHover={{ x: 5 }}
                            className="text-2xl font-bold text-gray-900 mb-2 cursor-default"
                          >
                            {item.name || "Unnamed Equipment"}
                          </motion.h2>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>
                              {item.created_at
                                ? new Date(item.created_at).toLocaleString("en-US", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  })
                                : "—"}
                            </span>
                          </div>
                        </div>

                        {/* Status badge */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span
                            className={`px-4 py-2 rounded-full text-xs font-bold shadow-md ${
                              item.status === "Available"
                                ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                                : item.status === "Not Available"
                                ? "bg-gradient-to-r from-red-400 to-rose-500 text-white"
                                : "bg-gradient-to-r from-blue-400 to-indigo-500 text-white"
                            }`}
                          >
                            {item.status || "Unknown"}
                          </span>
                        </motion.div>
                      </div>

                      {/* Description */}
                      <div className="relative">
                        <div className="absolute -left-3 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                        <p className="text-gray-600 text-sm leading-relaxed pl-4">
                          {item.content || "No description available."}
                        </p>
                      </div>
                    </div>

                    {/* Action area with animated icon */}
                    <motion.div
                      className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <motion.svg
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </motion.svg>
                        <span className="font-medium">Verified Equipment</span>
                      </div>
                      
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="text-blue-600 font-semibold text-sm cursor-pointer flex items-center gap-1"
                      >
                        View Details
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-8 bg-gradient-to-r from-gray-50 to-gray-100 text-sm text-gray-500 mt-16"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            🔬
          </motion.div>
          <span className="font-semibold">Lab Management System</span>
        </div>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </motion.footer>
    </div>
  );
}