import { useEffect, useState } from "react";
import { API } from "../utils/api";
import { motion } from "framer-motion";
import SubmissionEditModal from "../components/SubmissionEditModal"; // Verify this path matches your structure

export default function MySubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await API.get(`/submissions/user/${user.id}`);
        setSubmissions(res.data);
      } catch (err) {
        console.error("Failed to load submissions", err);
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) return;
    try {
      await API.delete(`/submissions/${id}`);
      setSubmissions(submissions.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("❌ Failed to delete. Try again.");
    }
  };

  const handleUpdate = (updated) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === updated.id ? updated : sub))
    );
    setEditingSubmission(null);
  };

  const isOwner = (submission) => {
    return user && submission.userId === user.id;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📸 My Submissions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {submissions.length > 0 ? (
          submissions.map((sub) => (
            <motion.div
              key={sub.id}
              className="bg-white/5 rounded-xl shadow-md p-4 backdrop-blur-lg border border-white/10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-lg font-bold mb-2">📌 {sub.title || "Untitled Quest"}</h2>
              <p className="text-sm text-white/70 mb-3">{sub.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {sub.imageUrls?.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Photo ${idx + 1}`}
                    className="rounded-lg object-cover w-full h-48 border border-white/10"
                  />
                ))}
              </div>

              {isOwner(sub) && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setEditingSubmission(sub)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm"
                  >
                    🗑 Delete
                  </button>
                </div>
              )}

              <p className="text-sm text-white/60 mb-2">
                📷 {sub.technicalInfo || "No camera info"}
              </p>
              <div className="text-xs text-white/40">
                Submitted: {new Date(sub.submittedAt).toLocaleString()}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-white/70">No submissions found.</p>
        )}
      </div>

      {editingSubmission && (
        <SubmissionEditModal
          submission={editingSubmission}
          onClose={() => setEditingSubmission(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}