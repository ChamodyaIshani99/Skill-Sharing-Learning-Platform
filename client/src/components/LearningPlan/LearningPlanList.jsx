import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LearningPlanList = ({ plans, onEdit, onDelete }) => {
  const [planStates, setPlanStates] = useState(plans);
  const navigate = useNavigate();

  useEffect(() => {
    setPlanStates(plans);
  }, [plans]);

  return (
    <>
      {/* Plan Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
        {planStates.map((plan) => (
          <div
            key={plan.id}
            onClick={() => navigate(`/plans/${plan.id}`)}
            className="bg-gray-200 p-6 rounded-xl shadow-lg flex flex-col relative text-gray-900 cursor-pointer hover:shadow-xl transition-shadow duration-200"
          >
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
              {plan.title}
            </h2>
            <p className="text-base font-semibold text-gray-700 mb-4">
              {plan.description}
            </p>

            {/* Action Buttons */}
            <div
              className="mt-auto flex justify-end space-x-3 pt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => onEdit(plan)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(plan.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LearningPlanList;
