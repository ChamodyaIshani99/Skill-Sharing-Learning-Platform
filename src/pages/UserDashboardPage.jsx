import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function UserDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Simulate loading state

  // ✅ Get and validate user from localStorage
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <motion.div 
          className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-2">Session Expired</h2>
          <p className="text-gray-300 mb-6">Please log in to access your dashboard</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  const handleEditProfile = () => {
    navigate(`/edit-profile?id=${user.id}`);
  };

  const handleGoToPhotoQuest = () => {
    navigate("/photoquests");
  };

  const userStats = [
    { label: "Photos Uploaded", value: 142, icon: "📷", color: "from-purple-500 to-indigo-500" },
    { label: "Followers", value: 856, icon: "👥", color: "from-blue-500 to-teal-500" },
    { label: "Following", value: 324, icon: "❤️", color: "from-pink-500 to-rose-500" },
    { label: "Achievements", value: 12, icon: "🏆", color: "from-yellow-500 to-amber-500" }
  ];

  // Mock gallery items
  const galleryItems = [...Array(9)].map((_, i) => ({
    id: i,
    image: `https://source.unsplash.com/random/300x300/?photography,${i}`,
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100)
  }));

  // Mock activity items
  const activityItems = [
    { id: 1, type: "like", user: "jane_doe", time: "2 hours ago", image: "https://source.unsplash.com/random/100x100/?portrait,1" },
    { id: 2, type: "comment", user: "photo_enthusiast", time: "5 hours ago", image: "https://source.unsplash.com/random/100x100/?portrait,2" },
    { id: 3, type: "follow", user: "new_follower", time: "1 day ago", image: "https://source.unsplash.com/random/100x100/?portrait,3" },
    { id: 4, type: "achievement", user: "system", time: "2 days ago", image: "https://source.unsplash.com/random/100x100/?trophy,1" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 overflow-x-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 15 + 5,
              height: Math.random() * 15 + 5,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              transition: {
                duration: Math.random() * 40 + 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Loading overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md z-20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  transition: {
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  } 
                }}
                className="w-16 h-16 border-4 border-t-purple-500 border-r-pink-500 border-b-transparent border-l-transparent rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.01] rounded-3xl shadow-2xl shadow-black/30 border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="w-full lg:w-1/3 p-6 sm:p-8 bg-gradient-to-b from-purple-900/30 via-gray-900/50 to-transparent border-b lg:border-b-0 lg:border-r border-white/10">
              {/* Profile section */}
              <div className="flex flex-col items-center">
                {/* Rotating Profile Picture */}
                <motion.div
                  className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-white/20 shadow-lg mb-6 group"
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                >
                  <motion.img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                    animate={{
                      rotateY: isHovering ? 180 : 0,
                      scale: isHovering ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6, type: "spring" }}
                  />
                  <AnimatePresence>
                    {isHovering && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <span className="text-white text-sm sm:text-base font-medium">View Profile</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-1">
                  {user.name}
                </h2>
                <p className="text-purple-300 text-center mb-6">@{user.username}</p>
                <p className="text-white/70 text-center text-sm mb-6 max-w-xs">
                  {user.bio || "Photography enthusiast capturing moments that matter"}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mb-6 sm:mb-8">
                  {userStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className={`bg-gradient-to-br ${stat.color} rounded-xl p-3 sm:p-4 text-center shadow-lg`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    >
                      <div className="text-xl sm:text-2xl mb-1">{stat.icon}</div>
                      <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/80">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="w-full space-y-3">
                  <motion.button
                    onClick={handleEditProfile}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit Profile
                  </motion.button>

                  <motion.button
                    onClick={handleGoToPhotoQuest}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    PhotoQuests
                  </motion.button>

                  <button
                    onClick={() => navigate("/my-submissions")}
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/30 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    My Submissions
                  </button>
                </div>
              </div>
            </div>

            {/* Main content area (tabs) */}
            <div className="w-full lg:w-2/3 p-6 sm:p-8">
              {/* Tabs */}
              <div className="flex overflow-x-auto pb-2 mb-6 sm:mb-8 scrollbar-hide">
                {[
                  { id: "profile", label: "Profile", icon: "👤" },
                  { id: "activity", label: "Activity", icon: "📈" }, 
                  { id: "gallery", label: "Gallery", icon: "🖼️" },
                  { id: "settings", label: "Settings", icon: "⚙️" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-2 font-medium relative whitespace-nowrap transition-colors ${
                      activeTab === tab.id ? "text-white" : "text-white/60 hover:text-white/80"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                        layoutId="tabIndicator"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[400px]"
                >
                  {activeTab === "profile" && (
                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-white mb-4">About Me</h3>
                        <p className="text-white/80">
                          {user.bio || "No bio available. Add a bio to tell others about yourself!"}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-white mb-4">Photography Style</h3>
                        <div className="flex flex-wrap gap-2">
                          {["Portrait", "Landscape", "Street", "Macro"].map((style) => (
                            <span key={style} className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm">
                              {style}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "activity" && (
                    <div className="space-y-4">
                      {activityItems.map((item) => (
                        <div key={item.id} className="bg-white/5 rounded-xl p-4 backdrop-blur-sm flex items-start gap-4">
                          <img src={item.image} alt={item.user} className="w-12 h-12 rounded-full object-cover" />
                          <div>
                            <p className="text-white">
                              <span className="font-semibold">{item.user}</span> {item.type === "like" ? "liked your photo" : 
                               item.type === "comment" ? "commented on your post" :
                               item.type === "follow" ? "started following you" : 
                               "You earned a new achievement!"}
                            </p>
                            <p className="text-white/50 text-sm">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "gallery" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {galleryItems.map((item) => (
                        <motion.div 
                          key={item.id}
                          className="relative group rounded-xl overflow-hidden aspect-square"
                          whileHover={{ scale: 1.02 }}
                        >
                          <img 
                            src={item.image} 
                            alt={`Photo ${item.id}`} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                            <div className="flex items-center text-white text-sm">
                              <span className="mr-2">❤️</span>
                              <span>{item.likes}</span>
                              <span className="mx-2">•</span>
                              <span className="mr-2">💬</span>
                              <span>{item.comments}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeTab === "settings" && (
                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-white mb-4">Account Settings</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-white/70 text-sm mb-1">Email</label>
                            <input 
                              type="email" 
                              value={user.email}
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-white/70 text-sm mb-1">Password</label>
                            <input 
                              type="password" 
                              placeholder="••••••••"
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                        </div>
                      </div>
                      <button className="bg-gradient-to-r from-red-500 to-amber-500 text-white py-3 px-6 rounded-xl font-medium">
                        Delete Account
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UserDashboardPage;