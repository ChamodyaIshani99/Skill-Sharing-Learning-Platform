import { useEffect, useState } from "react";
import { API } from "../utils/api";
import ParticipateForm from "../components/ParticipateForm";
import { motion, AnimatePresence } from "framer-motion";

function PhotoQuestPage() {
  const [quests, setQuests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        setIsLoading(true);
        const res = await API.get("/photoquests");
        setQuests(res.data);
      } catch (err) {
        console.error("Failed to load quests", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            📸 Explore PhotoQuests
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join creative challenges, showcase your photography skills, and connect with a community of artists
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="bg-white/5 rounded-xl p-5 h-64 animate-pulse"
              >
                <div className="h-6 bg-white/10 rounded mb-4 w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded w-full"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                  <div className="h-4 bg-white/10 rounded w-2/3"></div>
                </div>
                <div className="mt-8 h-10 bg-white/10 rounded-lg"></div>
              </div>
            ))}
          </div>
        )}

        {/* Quests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading && quests.map((quest, index) => (
            <motion.div
              key={quest.id}
              className="group relative bg-gradient-to-br from-white/5 to-white/[0.01] rounded-2xl p-6 backdrop-blur-sm shadow-xl border border-white/10 hover:border-purple-500/30 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              {/* Quest content */}
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">{quest.title}</h2>
                  <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                    {quest.category || "Photography"}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-6 flex-grow">{quest.description}</p>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {quest.duration || "7 days"}
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {quest.participants || 0} joined
                    </span>
                  </div>
                  
                  <motion.button
                    onClick={() => {
                      setSelectedQuest(quest);
                      setShowForm(true);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>🚀 Participate</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && quests.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mx-auto w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No PhotoQuests Available</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              There are currently no active photo challenges. Check back later or create your own!
            </p>
          </motion.div>
        )}
      </div>

      {/* Participate Modal */}
      <AnimatePresence>
        {showForm && selectedQuest && (
          <ParticipateForm
            questId={selectedQuest.id}
            selectedQuestTitle={selectedQuest.title}
            onClose={() => {
              setShowForm(false);
              setSelectedQuest(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default PhotoQuestPage;