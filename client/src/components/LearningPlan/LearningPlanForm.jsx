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
        ...initialData,
        topics: initialData.topics || [{ name: "", resources: [""] }],
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-2xl shadow-2xl w-[1000px] flex max-h-[90vh] overflow-hidden">
        
        {/* Left Side Form */}
        <div className="w-2/3 pr-6 flex flex-col overflow-y-auto">
          <h2 className="text-4xl font-bold text-center mb-8">{initialData.id ? "Update" : "Create"} Learning Plan</h2>

          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input 
              type="text" 
              name="title" 
              value={plan.title} 
              onChange={handleChange} 
              className="input input-bordered w-full rounded-lg p-2" 
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea 
              name="description" 
              value={plan.description} 
              onChange={handleChange} 
              className="textarea textarea-bordered w-full rounded-lg p-2" 
            />
          </div>

          {/* Topics and Resources */}
<div>
  <label className="block mb-1 font-semibold">Topics and Resources</label>
  {plan.topics.map((topic, topicIndex) => (
    <div key={topicIndex} className="mb-4 p-4 border rounded-lg bg-white">
      <input 
        type="text" 
        placeholder={`Topic ${topicIndex + 1}`} 
        value={topic.name} 
        onChange={(e) => handleTopicChange(topicIndex, "name", e.target.value)} 
        className="input input-bordered w-full mb-2 rounded-lg p-2 bg-blue-100 focus:bg-blue-200" 
      />
      {topic.resources.map((resource, resourceIndex) => (
        <input
          key={resourceIndex}
          type="text"
          placeholder={`Resource ${resourceIndex + 1}`}
          value={resource}
          onChange={(e) => handleResourceChange(topicIndex, resourceIndex, e.target.value)}
          className="input input-bordered w-full mb-2 rounded-lg p-2 bg-blue-100 focus:bg-blue-200" 
        />
      ))}
      <button 
        type="button" 
        onClick={() => addResource(topicIndex)} 
        className="btn btn-outline btn-sm"
      >
        ➕ Add Resource
      </button>
    </div>
  ))}
  <button 
    type="button" 
    onClick={addTopic} 
    className="btn btn-outline btn-sm mt-2"
  >
    ➕ Add Topic
  </button>
</div>


          {/* Dates */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Start Date</label>
              <input 
                type="date" 
                name="startDate" 
                value={plan.startDate} 
                min={today} 
                onChange={handleChange} 
                className="input input-bordered w-full rounded-lg p-2" 
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold">End Date</label>
              <input 
                type="date" 
                name="endDate" 
                value={plan.endDate} 
                min={plan.startDate} 
                onChange={handleChange} 
                className="input input-bordered w-full rounded-lg p-2" 
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-6">
            <button type="submit" className="w-1/2 mr-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">Save</button>
            <button type="button" onClick={onCancel} className="w-1/2 ml-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">Cancel</button>
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
