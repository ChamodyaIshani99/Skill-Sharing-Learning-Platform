import { useState, useEffect } from "react";
import animationImage from "../../assets/Business Plan.png";

const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD

const LearningPlanForm = ({ onSave, onCancel, initialData = {} }) => {
  const [plan, setPlan] = useState({
    title: "",
    description: "",
    topics: [{ name: "", resources: [""] }],
    startDate: today,
    endDate: "",
  });

  useEffect(() => {
    if (initialData.id) {
      setPlan({
        title: initialData.title || "",
        description: initialData.description || "",
        topics: Array.isArray(initialData.topics) && initialData.topics.length > 0
          ? initialData.topics
          : [{ name: "", resources: [""] }],
        startDate: initialData.startDate || today,
        endDate: initialData.endDate || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleTopicChange = (index, field, value) => {
    const updatedTopics = [...plan.topics];
    updatedTopics[index][field] = value;
    setPlan({ ...plan, topics: updatedTopics });
  };

  const handleResourceChange = (topicIndex, resourceIndex, value) => {
    const updatedTopics = [...plan.topics];
    updatedTopics[topicIndex].resources[resourceIndex] = value;
    setPlan({ ...plan, topics: updatedTopics });
  };

  const addTopic = () => {
    setPlan({ ...plan, topics: [...plan.topics, { name: "", resources: [""] }] });
  };

  const addResource = (topicIndex) => {
    const updatedTopics = [...plan.topics];
    updatedTopics[topicIndex].resources.push("");
    setPlan({ ...plan, topics: updatedTopics });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!plan.title || !plan.description) {
      alert("Title and Description are required.");
      return;
    }
    onSave(plan);
  };

  return (
<div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50 p-4">
<form onSubmit={handleSubmit} className="relative bg-gray-300 p-8 rounded-2xl shadow-2xl w-[1000px] flex max-h-[90vh] overflow-hidden">
        {/* ✖️ Cross button */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-6 text-gray-600 hover:text-gray-800 text-3xl font-bold"
        >
          &times;
        </button>

        {/* Left Side Form */}
        <div className="w-2/3 pr-6 flex flex-col overflow-y-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-black">
            {initialData.id ? "Update" : "Create"} Learning Plan
          </h2>

          <div>
            <label className="block mb-1 text-black font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={plan.title}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg p-2 mb-1 text-black"
            />
          </div>

          <div>
            <label className="block mb-1 text-black font-semibold">Description</label>
            <textarea
              name="description"
              value={plan.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full rounded-lg p-2 mb-1 text-black"
            />
          </div>

     {/* Topics and Resources */}
<div>
  <label className="block mb-1 text-black font-semibold">Topics and Resources</label>
  {Array.isArray(plan.topics) &&
    plan.topics.map((topic, topicIndex) => (
      <div
        key={topicIndex}
        className="mb-4 p-4 border rounded-lg bg-white mb-1 text-black"
      >
        <label><b>Topic</b></label>
        <input
          type="text"
          placeholder={`Topic ${topicIndex + 1}`}
          value={topic.name}
          onChange={(e) =>
            handleTopicChange(topicIndex, "name", e.target.value)
          }
          className="input input-bordered w-full rounded-lg p-2 mb-2 text-black"
          style={{ backgroundColor: "#6CB4EE" }}
        />
        {topic.resources.map((resource, resourceIndex) => (
  <div key={resourceIndex}>
    <label>Resource</label>
    <input
      type="text"
      placeholder={`Resource ${resourceIndex + 1}`}
      value={resource}
      onChange={(e) =>
        handleResourceChange(topicIndex, resourceIndex, e.target.value)
      }
      className="input input-bordered w-full rounded-lg p-2 mb-2 text-black placeholder-black"
      style={{ backgroundColor: "#B9D9EB" }}
    />
  </div>
))}

        <button
          type="button"
          onClick={() => addResource(topicIndex)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-lg text-sm mb-1"
        >
          ➕ Add Resource
        </button>
      </div>
    ))}
  <button
    type="button"
    onClick={addTopic}
    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-lg text-sm mt-2 mb-1"
  >
    ➕ Add Topic
  </button>
</div>



          {/* Dates */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block mb-1 text-black font-semibold mb-1 text-black">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={plan.startDate}
                min={today}
                onChange={handleChange}
                className="input input-bordered w-full rounded-lg p-2 mb-1 text-black"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-black font-semibold">End Date</label>
              <input
                type="date"
                name="endDate"
                value={plan.endDate}
                min={plan.startDate}
                onChange={handleChange}
                className="input input-bordered w-full rounded-lg p-2 mb-1 text-black"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="submit"
              className="w-1/2 mr-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-1/2 ml-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Right Side Animation */}
        <div className="w-1/3 flex items-center justify-center">
          <img
            src={animationImage}
            alt="Learning Animation"
            className="w-full h-auto animate-float shadow-lg rounded-xl"
          />
        </div>
      </form>
    </div>
  );
};

export default LearningPlanForm;
