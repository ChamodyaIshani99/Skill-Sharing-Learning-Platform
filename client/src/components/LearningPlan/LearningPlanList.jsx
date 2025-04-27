import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

const LearningPlanList = ({ plans, onEdit, onDelete }) => {
  const [planStates, setPlanStates] = useState(plans);

  const toggleResource = (planId, index) => {
    const updatedPlans = planStates.map(plan => {
      if (plan.id === planId) {
        const updatedResources = [...plan.resources];
        updatedResources[index].completed = !updatedResources[index].completed;
        return { ...plan, resources: updatedResources };
      }
      return plan;
    });
    setPlanStates(updatedPlans);
  };

  const calculateProgress = (resources) => {
    if (!resources || resources.length === 0) return 0;
    const completed = resources.filter(r => r.completed).length;
    return Math.round((completed / resources.length) * 100);
  };

  const calculateDaysRemaining = (endDate) => {
    const today = new Date();
    const deadline = new Date(endDate);
    const timeDiff = deadline - today;
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert time difference to days
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {planStates.map(plan => (
        <div key={plan.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col relative">
          {/* Title */}
        
          <h2 className="text-3xl font-extrabold mb-2 text-center">{plan.title}</h2>


          {/* Description */}
          <p className="text-gray-600 mb-2">{plan.description}</p>

          

          

          {/* Resources List */}
          <div className="space-y-1">
            {plan.resources?.map((resource, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={resource.completed}
                  onChange={() => toggleResource(plan.id, index)}
                />
                <span className={resource.completed ? "line-through text-gray-400" : ""}>
                  {resource.name}
                </span>
              </div>
            ))}
          </div>

          {/* Topics List */}
          <div className="mt-4">
            <h4 className="font-semibold text-sm text-gray-600">Topics:</h4>
            <ul className="list-disc pl-5">
              {plan.topics?.map((topic, index) => (
                <li key={index} className="text-gray-700">{topic.name}</li>
              ))}
            </ul>
          </div><br />
          {/* Start and End Dates */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500"><strong>Start:</strong> {plan.startDate?.split('T')[0]}</span>
            <span className="text-sm text-gray-500"><strong>End:</strong> {plan.endDate?.split('T')[0]}</span>
          </div>

          {/* Days Remaining */}
          <div className="text-sm text-red-500 mb-4">
            <strong>Days Remaining:</strong> {calculateDaysRemaining(plan.endDate)} days
          </div>

          {/* Action Buttons */}
          <div className="mt-auto flex justify-end space-x-3 pt-4">
            <button onClick={() => onEdit(plan)} className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
            <button onClick={() => onDelete(plan.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningPlanList;
