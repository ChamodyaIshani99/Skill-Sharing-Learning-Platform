import { useState } from "react";
import { uploadImageToCloudinary } from "../utils/uploadImage";
import { API } from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ParticipateForm({ questId, onClose, selectedQuestTitle }) {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [technicalInfo, setTechnicalInfo] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    processFiles(selected);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const processFiles = (files) => {
    if (files.length + files.length > 3) {
      setError("Maximum 3 photos allowed");
      return;
    }

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        setError(`File ${file.name} is not an image`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError(`File ${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    setFiles([...files, ...validFiles]);
    setError(null);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (files.length === 0) {
      setError("Please upload at least one photo");
      return;
    }

    if (!description.trim()) {
      setError("Please provide a description");
      return;
    }

    try {
      setUploading(true);
      const uploadedUrls = [];

      for (const file of files) {
        try {
          const url = await uploadImageToCloudinary(file);
          uploadedUrls.push(url);
        } catch (uploadErr) {
          console.error("Upload failed for file", file.name, uploadErr);
          throw new Error(`Failed to upload ${file.name}. Please try again.`);
        }
      }

      const response = await API.post("/submissions", {
        photoQuestId: questId,
        userId: JSON.parse(localStorage.getItem("user")).id,
        imageUrls: uploadedUrls,
        description: description.trim(),
        technicalInfo: technicalInfo.trim(),
        challengeName: selectedQuestTitle,
      });

      if (response.status === 201) {
        alert("Upload successful! Redirecting to PhotoQuestPage...");
        navigate("/photoquests");
      }
    } catch (err) {
      console.error("Submission failed", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Submission failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-2"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-gradient-to-br from-purple-800 to-pink-700 rounded-xl shadow-lg border border-white/10 w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 relative">
            <h2 className="text-lg font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
              Submit to {selectedQuestTitle}
            </h2>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Upload Photos (Max 3)
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${
                  isDragging
                    ? "border-yellow-400 bg-white/5"
                    : "border-white/20 hover:border-white/30"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <p className="text-white/80 text-sm">
                    {isDragging ? "Drop your photos here" : "Drag & drop photos here"}
                  </p>
                  <p className="text-xs text-white/50">or</p>
                  <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/20 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                    <span>Browse Files</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-white/50 mt-1">
                    Supports JPEG, PNG. Max 5MB per image.
                  </p>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="grid grid-cols-3 gap-2"
              >
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden group"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-1 right-1 p-1 bg-black/70 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 rounded-lg p-2 text-red-300 text-xs flex items-start gap-2"
              >
                <span>{error}</span>
              </motion.div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Description
              </label>
              <textarea
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 text-sm transition-all"
                placeholder="Tell us about your photo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Technical Info */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Technical Info
              </label>
              <textarea
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 text-sm transition-all"
                placeholder="Camera model, ISO, f-stop, shutter speed..."
                value={technicalInfo}
                onChange={(e) => setTechnicalInfo(e.target.value)}
                rows={2}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={uploading || files.length === 0}
              className={`w-full py-3 rounded-lg font-bold text-sm relative overflow-hidden ${
                uploading || files.length === 0
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-500 to-red-500 hover:shadow-lg hover:shadow-yellow-500/30"
              }`}
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Uploading...
                </span>
              ) : (
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Submit Entry
                </span>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ParticipateForm;