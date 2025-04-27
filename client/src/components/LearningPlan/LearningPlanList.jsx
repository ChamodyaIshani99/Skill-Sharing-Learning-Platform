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

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {planStates.map(plan => (
        <div key={plan.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col relative">
          <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
          <p className="text-gray-600 mb-2">{plan.description}</p>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500"><strong>Start:</strong> {plan.startDate?.split('T')[0]}</span>
            <span className="text-sm text-gray-500"><strong>End:</strong> {plan.endDate?.split('T')[0]}</span>
          </div>

          {/* Progress Circle */}
          <div className="flex justify-center my-4">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full">
                <circle
                  cx="50%" cy="50%" r="30%"
                  stroke="#e5e7eb" strokeWidth="8" fill="none"
                />
                <circle
                  cx="50%" cy="50%" r="30%"
                  stroke="#3b82f6" strokeWidth="8" fill="none"
                  strokeDasharray="188"
                  strokeDashoffset={188 - (188 * calculateProgress(plan.resources)) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {calculateProgress(plan.resources)}%
              </div>
            </div>
          </div>

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


