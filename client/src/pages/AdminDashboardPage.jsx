import { useNavigate } from "react-router-dom";

function AdminDashboardPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleCreateQuestClick = () => {
    navigate("/admin/photoquests/create");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center">
              <span className="mr-3 text-indigo-500">🛠️</span> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Admin Dashboard
              </span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage your platform efficiently with powerful tools
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate("/")} 
              className="px-4 py-2 bg-white hover:bg-gray-50 rounded-lg text-gray-700 transition-all duration-300 
                         shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300
                         flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Site
            </button>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-6 mb-8 
                        border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img 
                src={user.profilePic} 
                alt="Admin" 
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-indigo-100 
                           shadow-inner hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-2 -right-2 bg-indigo-500 rounded-full p-1.5 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-2xl font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex justify-center md:justify-start gap-2">
                <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  {user.role}
                </span>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden
                        border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="text-indigo-500">📌</span> 
              <span>Admin Tools</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {/* Create PhotoQuest Card */}
            <div 
              onClick={handleCreateQuestClick}
              className="group relative bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 cursor-pointer 
                         hover:shadow-lg transition-all duration-300 border border-indigo-100 overflow-hidden
                         hover:border-indigo-200 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-full h-1 bg-indigo-500"></div>
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg group-hover:bg-indigo-200 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-1">Create PhotoQuest</h4>
                  <p className="text-gray-600 text-sm">Design and publish new photo challenges for users</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="text-indigo-600 text-sm font-medium flex items-center gap-1">
                  Go to tool
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Manage Users Card */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 
                            transition-all duration-300 border border-blue-100 overflow-hidden
                            hover:border-blue-200 hover:-translate-y-1 opacity-70 cursor-not-allowed">
              <div className="absolute top-0 right-0 w-full h-1 bg-blue-500"></div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-1">Manage Users</h4>
                  <p className="text-gray-600 text-sm">View, edit, and manage user accounts and permissions</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  Coming soon
                </span>
              </div>
            </div>

            {/* View Reports Card */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 
                            transition-all duration-300 border border-purple-100 overflow-hidden
                            hover:border-purple-200 hover:-translate-y-1 opacity-70 cursor-not-allowed">
              <div className="absolute top-0 right-0 w-full h-1 bg-purple-500"></div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-1">View Reports</h4>
                  <p className="text-gray-600 text-sm">Analyze platform activity and user engagement</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                  Coming soon
                </span>
              </div>
            </div>

            {/* Additional Tool Cards can be added here */}
            <div className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 
                            transition-all duration-300 border border-gray-200 overflow-hidden
                            hover:border-gray-300 hover:-translate-y-1 opacity-70 cursor-not-allowed">
              <div className="absolute top-0 right-0 w-full h-1 bg-gray-500"></div>
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-1">Content Moderation</h4>
                  <p className="text-gray-600 text-sm">Review and moderate user-generated content</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                  Coming soon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section (Optional) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total PhotoQuests</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">24</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +12% from last month
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Users</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">1,248</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +8% from last month
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Submissions</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">5,672</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +23% from last month
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;