import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseclient";
import { motion } from "framer-motion";
import Line from "../assets/Line.png";

export default function Lab2() {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEquipments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      console.log("Fetched data:", data); // Debug log
      setEquipments(data || []);
    } catch (err) {
      console.error("Error fetching equipments:", err);
      setEquipments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data immediately on mount
    fetchEquipments();

    // Set up realtime subscription
    const channel = supabase
      .channel("realtime-posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        (payload) => {
          console.log("Realtime event:", payload); // Debug log
          
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

    // Cleanup function
    return () => {
      console.log("Cleaning up subscription"); // Debug log
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-gradient-to-r from-[#003a70] via-[#0052a3] to-[#003a70] text-white py-16 text-center shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Lab Equipment Gallery
          </h1>
          <p className="text-blue-100 text-base md:text-lg font-light tracking-wide">
            Explore cutting-edge laboratory equipment at your fingertips
          </p>
        </motion.div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        className="flex justify-center mt-8"
      >
        <img src={Line} alt="divider" className="w-48 opacity-70" />
      </motion.div>

      <section className="p-6 max-w-5xl mx-auto relative z-10">
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center mt-32 mb-32"
          >
            {/* Modern animated loader */}
            <div className="relative w-24 h-24">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-indigo-500"
              ></motion.div>
              
              {/* Middle rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-500 border-l-pink-500"
              ></motion.div>
              
              {/* Inner pulsing circle */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600"
              ></motion.div>
              
              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="w-3 h-3 rounded-full bg-white shadow-lg"
                ></motion.div>
              </div>
            </div>

            {/* Loading text with dots animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex items-center gap-2"
            >
              <p className="text-gray-600 text-lg font-semibold">Loading equipment</p>
              <div className="flex gap-1">
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  className="text-blue-600 text-lg font-bold"
                >.</motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="text-indigo-600 text-lg font-bold"
                >.</motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="text-purple-600 text-lg font-bold"
                >.</motion.span>
              </div>
            </motion.div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.sin(i) * 20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full blur-sm"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: '50%',
                  }}
                ></motion.div>
              ))}
            </div>
          </motion.div>
        ) : equipments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-32 bg-white/60 backdrop-blur-sm rounded-2xl p-12 shadow-lg"
          >
            <div className="text-6xl mb-4">🔬</div>
            <p className="text-gray-600 text-xl font-semibold">No equipment found</p>
            <p className="text-gray-400 mt-2">Upload your first piece of equipment to get started!</p>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col gap-8 mt-10"
            initial="hidden"
            animate="visible"
            variants={{ 
              hidden: { opacity: 0 }, 
              visible: { 
                opacity: 1, 
                transition: { staggerChildren: 0.1 } 
              } 
            }}
          >
            {equipments.map((item, index) => (
              <motion.div
                key={item.id}
                variants={{ 
                  hidden: { opacity: 0, x: -50, rotateY: -15 }, 
                  visible: { opacity: 1, x: 0, rotateY: 0 } 
                }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="group relative flex flex-col md:flex-row bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)'
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none"></div>
                
                {/* Image Section */}
                <div className="md:w-2/5 w-full h-64 md:h-auto overflow-hidden flex-shrink-0 relative">
                  {item.image_url ? (
                    <>
                      <motion.img
                        src={item.image_url}
                        alt={item.content || "Equipment"}
                        loading="lazy"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-2">📷</div>
                        <span className="text-gray-400 text-sm font-medium">No Image</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Index badge */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                    className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg font-bold text-blue-600 text-sm"
                  >
                    {index + 1}
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 w-full p-7 md:p-8 flex flex-col justify-between relative z-10">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <motion.h2 
                          className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          {item.name || "Unnamed Equipment"}
                        </motion.h2>
                        <motion.div 
                          className="flex items-center gap-2 text-xs text-gray-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.4 }}
                        >
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
                        </motion.div>
                      </div>

                      {/* Status badge */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                        className="hidden md:block"
                      >
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm flex items-center gap-2 ${
                            item.status === "Available"
                              ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                              : item.status === "Not Available"
                              ? "bg-gradient-to-r from-red-400 to-rose-500 text-white"
                              : "bg-gradient-to-r from-blue-400 to-indigo-500 text-white"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${
                            item.status === "Available" ? "bg-white animate-pulse" : "bg-white/70"
                          }`}></span>
                          {item.status || "Unknown"}
                        </span>
                      </motion.div>
                    </div>

                    {/* Description */}
                    <motion.p 
                      className="text-gray-600 text-sm md:text-base leading-relaxed mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      {item.content || "No description available."}
                    </motion.p>
                  </div>

                  {/* Mobile status */}
                  <div className="mt-6 flex items-center justify-between gap-3 md:hidden">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.7, type: "spring" }}
                      className={`px-4 py-2 rounded-full text-xs font-bold shadow-md flex items-center gap-2 ${
                        item.status === "Available"
                          ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                          : item.status === "Not Available"
                          ? "bg-gradient-to-r from-red-400 to-rose-500 text-white"
                          : "bg-gradient-to-r from-blue-400 to-indigo-500 text-white"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${
                        item.status === "Available" ? "bg-white animate-pulse" : "bg-white/70"
                      }`}></span>
                      {item.status || "Unknown"}
                    </motion.span>
                  </div>

                  {/* Decorative corner element */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-100/40 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative text-center py-10 bg-gradient-to-r from-gray-50 to-slate-100 text-sm text-gray-500 mt-20 border-t border-gray-200"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZG90cykiLz48L3N2Zz4=')] opacity-50"></div>
        <p className="relative z-10 font-medium">
          © {new Date().getFullYear()} Lab Management System — Powered by Innovation
        </p>
      </motion.footer>
    </div>
  );
}y