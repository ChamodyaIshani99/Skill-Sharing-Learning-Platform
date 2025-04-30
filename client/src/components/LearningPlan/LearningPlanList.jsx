import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";

const LearningPlanList = ({ plans, onEdit, onDelete, onResourceToggle }) => {
  const [planStates, setPlanStates] = useState(plans);

  useEffect(() => {
    setPlanStates(plans);
  }, [plans]);

  const toggleResource = (planId, index) => {
    const updatedPlans = planStates.map(plan => {
      if (plan.id === planId) {
        const updatedResources = [...plan.resources];
        updatedResources[index].completed = !updatedResources[index].completed;

        const updatedPlan = { ...plan, resources: updatedResources };
        updatedPlan.completed = calculateProgress(updatedResources, plan.topics) === 100;
        return updatedPlan;
      }
      return plan;
    });
    setPlanStates(updatedPlans);
    onResourceToggle(updatedPlans);
  };

  const toggleTopic = (planId, topicIndex) => {
    const updatedPlans = planStates.map(plan => {
      if (plan.id === planId) {
        const updatedTopics = [...plan.topics];
        updatedTopics[topicIndex].completed = !updatedTopics[topicIndex].completed;

        const updatedPlan = { ...plan, topics: updatedTopics };
        updatedPlan.completed = calculateProgress(plan.resources, updatedTopics) === 100;
        return updatedPlan;
      }
      return plan;
    });
    setPlanStates(updatedPlans);
  };

  const calculateProgress = (resources, topics) => {
    const totalItems = (resources?.length || 0) + (topics?.length || 0);
    if (totalItems === 0) return 0;

    const completedResources = resources?.filter(r => r.completed).length || 0;
    const completedTopics = topics?.filter(t => t.completed).length || 0;

    const completedTotal = completedResources + completedTopics;
    return Math.round((completedTotal / totalItems) * 100);
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

      {/* Plans List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planStates.map(plan => {
          const progress = calculateProgress(plan.resources, plan.topics);

          return (
          <div key={plan.id} className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col relative">
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
                <h4 className="font-semibold text-sm text-gray-600 mb-1">Topics:</h4>
                <ul className="list-none space-y-1">
                  {plan.topics?.map((topic, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <input
                        type="checkbox"
                        checked={topic.completed || false}
                        onChange={() => toggleTopic(plan.id, index)}
                      />
                      <span className={topic.completed ? "line-through text-gray-400" : ""}>
                        {topic.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <br />

              {/* Dates */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500"><strong>Start:</strong> {plan.startDate?.split('T')[0]}</span>
                <span className="text-sm text-gray-500"><strong>End:</strong> {plan.endDate?.split('T')[0]}</span>
              </div>

              

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Completed Label (after Progress Bar) */}
              {plan.completed && (
                <div className="text-center text-green-600 font-bold text-sm mt-2">
                  ✅ Plan Completed
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-auto flex justify-end space-x-3 pt-4">
                <button onClick={() => onEdit(plan)} className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                <button onClick={() => onDelete(plan.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LearningPlanList;
