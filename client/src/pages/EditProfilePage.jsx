import { useSearchParams } from "react-router-dom";
import EditProfileForm from "../components/EditProfileForm";
import { motion } from "framer-motion"; // We'll use this everywhere

function EditProfilePage() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Edit My Profile
          </h2>
          <p className="mt-3 text-xl text-gray-500">
            Update your personal information and preferences
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={itemVariants}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          {userId ? (
            <EditProfileForm userId={userId} />
          ) : (
            <motion.div 
              variants={itemVariants}
              className="p-8 text-center"
            >
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">User ID not found</h3>
              <p className="text-gray-500">
                Please check the URL and try again or return to your profile.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                className="mt-6 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go Back
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <p>All changes are saved automatically</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default EditProfilePage;