import { useState, useEffect } from "react";
import animationImage from "../../assets/Business Plan.png"; // You can change this to your animation image path

const LearningPlanForm = ({ onSave, onCancel, initialData = {} }) => {
  const [plan, setPlan] = useState({
    title: "",
    description: "",
    topics: "",
    resources: [""],
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (initialData.id) {
      setPlan({
        ...initialData,
        topics: initialData.topics?.join(", "),
        resources: initialData.resources || [""],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleResourceChange = (index, value) => {
    const updatedResources = [...plan.resources];
    updatedResources[index] = value;
    setPlan({ ...plan, resources: updatedResources });
  };

  const addResourceField = () => {
    setPlan({ ...plan, resources: [...plan.resources, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!plan.title || !plan.description) {
      alert("Title and Description are required.");
      return;
    }
    onSave({
      ...plan,
      topics: plan.topics.split(",").map(t => t.trim()),
      resources: plan.resources.filter(r => r.trim() !== ""),
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-xl shadow-2xl w-[900px] flex">
        
        {/* Left Side Form */}
        <div className="w-2/3 space-y-4 pr-6">
          <h2 className="text-3xl font-bold text-center mb-6">{initialData.id ? "Update" : "Create"} Learning Plan</h2>

          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input type="text" name="title" value={plan.title} onChange={handleChange} className="input input-bordered w-full" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea name="description" value={plan.description} onChange={handleChange} className="textarea textarea-bordered w-full" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Topics (comma separated)</label>
            <input type="text" name="topics" value={plan.topics} onChange={handleChange} className="input input-bordered w-full" />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Resources</label>
            {plan.resources.map((resource, index) => (
              <input
                key={index}
                type="text"
                value={resource}
                onChange={(e) => handleResourceChange(index, e.target.value)}
                placeholder={`Resource ${index + 1}`}
                className="input input-bordered w-full mb-2"
              />
            ))}
            <button type="button" onClick={addResourceField} className="btn btn-outline btn-sm mt-1">
              ➕ Add More Resources
            </button>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Start Date</label>
              <input type="date" name="startDate" value={plan.startDate} onChange={handleChange} className="input input-bordered w-full" />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold">End Date</label>
              <input type="date" name="endDate" value={plan.endDate} onChange={handleChange} className="input input-bordered w-full" />
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <button type="submit" className="btn btn-primary w-1/2">Save</button>
            <button type="button" onClick={onCancel} className="btn btn-ghost w-1/2">Cancel</button>
          </div>
        </div>

        {/* Right Side Animation */}
<div className="w-1/3 flex items-center justify-center">
  <img 
    src={animationImage} 
  alt="Learning Animation" 
  className="w-full h-auto animate-float shadow-lg" 
  />
</div>


      </form>
    </div>
  );
};

export default LearningPlanForm;
