import { useState } from "react";
import { uploadImageToCloudinary } from "../utils/uploadImage";
import { API } from "../utils/api";
import { motion } from "framer-motion";

export default function SubmissionEditModal({ submission, onClose, onUpdate }) {
  const [description, setDescription] = useState(submission.description || "");
  const [technicalInfo, setTechnicalInfo] = useState(submission.technicalInfo || "");
  const [images, setImages] = useState(submission.imageUrls || []);
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    if (images.length + newFiles.length + selected.length > 3) {
      setError("Maximum 3 photos allowed");
      return;
    }
    setError("");
    setNewFiles([...newFiles, ...selected]);
  };

  const handleRemoveImage = (index) => {
    if (images.length + newFiles.length <= 1) {
      setError("At least one image is required");
      return;
    }
    setError("");
    setImages(images.filter((_, i) => i !== index));
  };

  const handleRemoveNewFile = (index) => {
    if (images.length + newFiles.length <= 1) {
      setError("At least one image is required");
      return;
    }
    setError("");
    setNewFiles(newFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (images.length + newFiles.length === 0) {
      setError("At least one image is required");
      return;
    }

    setLoading(true);
    try {
      const uploadedUrls = [];
      for (const file of newFiles) {
        const url = await uploadImageToCloudinary(file);
        uploadedUrls.push(url);
      }

      const finalImages = [...images, ...uploadedUrls];

      const updated = await API.put(`/submissions/${submission.id}`, {
        description,
        technicalInfo,
        imageUrls: finalImages,
      });

      onUpdate(updated.data);
      onClose();
    } catch (err) {
      console.error("Edit failed", err);
      setError("Edit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-400 text-xl"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Edit Your Submission</h2>

        {error && <div className="mb-4 text-red-400">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Photos (Max 3)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {images.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={url}
                    alt="existing"
                    className="rounded-lg w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 transition"
                  >
                    ✖
                  </button>
                </div>
              ))}

              {newFiles.map((file, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="new"
                    className="rounded-lg w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewFile(idx)}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 transition"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>

            <label className="block bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg cursor-pointer text-center">
              📷 Add More Photos
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-white mb-2">Description</label>
            <textarea
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your submission..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-white mb-2">Technical Info</label>
            <textarea
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
              value={technicalInfo}
              onChange={(e) => setTechnicalInfo(e.target.value)}
              placeholder="Camera settings, equipment used..."
              rows={2}
            />
          </div>

          <div className="flex gap-3">
            <motion.button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </motion.button>
            
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-bold"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}