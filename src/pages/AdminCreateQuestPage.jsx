import { useState } from "react";
import { API } from "../utils/api"; // Your API axios setup
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function AdminCreateQuestPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    createdBy: JSON.parse(localStorage.getItem("user"))?.name || "admin"
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/photoquests", formData);
      alert("PhotoQuest Created Successfully 🎉");
      navigate("/admin/dashboard"); // Or wherever your admin dashboard route is
    } catch (error) {
      console.error(error);
      alert("Failed to create PhotoQuest!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-800 via-pink-600 to-red-400 flex items-center justify-center p-8">
      <motion.form 
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-2xl w-full space-y-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-white text-3xl font-bold text-center">Create New PhotoQuest 📸</h2>

        <div className="space-y-2">
          <label className="text-white font-semibold">Title</label>
          <input 
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none"
            placeholder="Best Sunset Shot"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-white font-semibold">Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none"
            placeholder="Capture the best sunset you can find!"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-white font-semibold">Start Date</label>
            <input 
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/20 text-white focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-white font-semibold">End Date</label>
            <input 
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/20 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <motion.button 
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold text-lg"
        >
          Create PhotoQuest 🚀
        </motion.button>
      </motion.form>
    </div>
  );
}

export default AdminCreateQuestPage;
