import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";

const LearningPlanList = ({ plans, onEdit, onDelete, onResourceToggle }) => {
  const [planStates, setPlanStates] = useState(plans);

  useEffect(() => {
    setPlanStates(plans);
  }, [plans]);

  const toggleCompletion = (planId) => {
    const updatedPlans = planStates.map(plan => {
      if (plan.id === planId) {
        return { ...plan, completed: !plan.completed };
      }
      return plan;
    });
    setPlanStates(updatedPlans);
  };

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
    onResourceToggle(updatedPlans);
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
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const totalPlans = planStates.length;
  const completedPlans = planStates.filter(plan => plan.completed).length;
  const pendingPlans = totalPlans - completedPlans;

  return (
    <>
      {/* Summary Section */}
      <div className="flex justify-center gap-8 mb-8">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="font-bold text-lg text-blue-600">Total Plans</h3>
          <p className="text-xl font-semibold">{totalPlans}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="font-bold text-lg text-green-600">Completed Plans</h3>
          <p className="text-xl font-semibold">{completedPlans}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="font-bold text-lg text-red-600">Pending Plans</h3>
          <p className="text-xl font-semibold">{pendingPlans}</p>
        </div>
      </div>

      {/* Plans Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planStates.map(plan => (
          <div key={plan.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col relative">
            <h2 className="text-3xl font-extrabold mb-2 text-center">{plan.title}</h2>
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
            </div>
            <br />

            {/* Dates */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500"><strong>Start:</strong> {plan.startDate?.split('T')[0]}</span>
              <span className="text-sm text-gray-500"><strong>End:</strong> {plan.endDate?.split('T')[0]}</span>
            </div>

            {/* Days Remaining */}
            <div className="text-sm text-red-500 mb-4">
              <strong>Days Remaining:</strong> {calculateDaysRemaining(plan.endDate)} days
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${calculateProgress(plan.resources)}%` }}
              ></div>
            </div>

            {/* Completion Toggle */}
            <div className="flex items-center justify-center mb-4">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={plan.completed || false}
                  onChange={() => toggleCompletion(plan.id)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500">
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {plan.completed ? "Completed" : "Not Completed"}
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto flex justify-end space-x-3 pt-4">
              <button onClick={() => onEdit(plan)} className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
              <button onClick={() => onDelete(plan.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LearningPlanList;
