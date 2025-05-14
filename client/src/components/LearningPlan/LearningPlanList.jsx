import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LearningPlanList = ({ plans, onEdit, onDelete, onResourceToggle }) => {
  const [planStates, setPlanStates] = useState(plans);
  const navigate = useNavigate();

  useEffect(() => {
    setPlanStates(plans);
  }, [plans]);

  const toggleResource = (planId, index) => {
    const updatedPlans = planStates.map((plan) => {
      if (plan.id === planId) {
        const updatedResources = [...plan.resources];
        updatedResources[index].completed = !updatedResources[index].completed;
        const updatedPlan = { ...plan, resources: updatedResources };
        updatedPlan.completed = calculateProgress(updatedPlan.resources, plan.topics) === 100;
        return updatedPlan;
      }
      return plan;
    });
    setPlanStates(updatedPlans);
    onResourceToggle(updatedPlans);
  };

  const toggleTopic = (planId, topicIndex) => {
    const updatedPlans = planStates.map((plan) => {
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
    const completedResources = resources?.filter((r) => r.completed).length || 0;
    const completedTopics = topics?.filter((t) => t.completed).length || 0;
    return Math.round(((completedResources + completedTopics) / totalItems) * 100);
  };

  const totalPlans = planStates.length;
  const completedPlans = planStates.filter((plan) => plan.completed).length;
  const pendingPlans = totalPlans - completedPlans;

  return (
    <>
      {/* Summary Cards */}
      <div className="flex justify-center gap-8 mb-8">
        {[ 
          { label: "Total Plans", value: totalPlans },
          { label: "Completed Plans", value: completedPlans },
          { label: "Pending Plans", value: pendingPlans },
        ].map((item) => (
          <div
            key={item.label}
            className="w-64 h-40 rounded-2xl text-black p-6 shadow-lg text-center flex flex-col justify-center items-center transition-transform transform hover:scale-105"
            style={{
              background: "linear-gradient(90deg, rgba(42,123,155,1) 0%, rgba(87,199,133,1) 60%, rgba(40,60,173,1) 100%)",
            }}
          >
            <h3 className="text-xl font-bold mb-2">{item.label}</h3>
            <p className="text-4xl font-extrabold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Plan Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
        {planStates.map((plan) => {
          const progress = calculateProgress(plan.resources, plan.topics);
          return (
            <div
              key={plan.id}
              onClick={() => navigate(`/plans/${plan.id}`)}
              className="bg-gray-200 p-6 rounded-xl shadow-lg flex flex-col relative text-gray-900 cursor-pointer hover:shadow-xl transition-shadow duration-200"
            >
              <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">{plan.title}</h2>
              <p className="text-base font-semibold text-gray-700 mb-4">{plan.description}</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-300 rounded-full h-2.5 mb-2 mt-4">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {plan.completed && (
                <div className="text-center text-green-600 font-bold text-sm mt-2">
                  ✅ Plan Completed
                </div>
              )}

              {/* Action Buttons */}
              <div
                className="mt-auto flex justify-end space-x-3 pt-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => onEdit(plan)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(plan.id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LearningPlanList;
