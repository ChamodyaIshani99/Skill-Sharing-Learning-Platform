import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const LearningPlanDetail = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedResources, setCompletedResources] = useState({});

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/learning-plans/${id}`);
        setPlan(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching learning plan:", error);
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  // Calculate remaining days
  const getRemainingDays = (endDate) => {
    const today = moment().startOf('day');
    const end = moment(endDate).startOf('day');
    const diff = end.diff(today, 'days');
    return diff >= 0 ? `${diff} day(s) remaining` : "Past deadline";
  };

  // Toggle resource completion
  const toggleResource = (topicIndex, resourceIndex) => {
    const key = `${topicIndex}-${resourceIndex}`;
    setCompletedResources((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  if (!plan) {
    return <div className="p-6 text-center text-red-600">Learning plan not found.</div>;
  }
  // Calculate progress
const getProgress = () => {
  let total = 0;
  let completed = 0;

  plan.topics?.forEach((topic, topicIndex) => {
    topic.resources?.forEach((_, resourceIndex) => {
      total += 1;
      const key = `${topicIndex}-${resourceIndex}`;
      if (completedResources[key]) {
        completed += 1;
      }
    });
  });

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percentage };
};

const { completed, total, percentage } = getProgress();


  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">{plan.title}</h2>
      <p className="text-gray-700 mb-2"><strong>Description:</strong> {plan.description}</p>
      <p className="text-gray-700 mb-2">
        <strong>Start Date:</strong> {plan.startDate}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>End Date:</strong> {plan.endDate}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Time Left:</strong> {getRemainingDays(plan.endDate)}
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">Topics:</h3>
      <ul className="list-disc list-inside space-y-3">
        {plan.topics && plan.topics.map((topic, topicIndex) => (
          <li key={topicIndex}>
            <strong>{topic.name}</strong>
            {topic.resources && topic.resources.length > 0 && (
              <ul className="list-inside ml-4 mt-1 text-sm space-y-1">
                {topic.resources.map((resource, resourceIndex) => {
                  const key = `${topicIndex}-${resourceIndex}`;
                  const isCompleted = completedResources[key] || false;
                  return (
                    <li
                      key={resourceIndex}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => toggleResource(topicIndex, resourceIndex)}
                        className="cursor-pointer"
                      />
                      <span className={isCompleted ? "line-through text-green-600" : ""}>
                        {resource}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {/* Progress Bar Section */}
<div className="mb-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-1">Progress</h3>
  <div className="w-full bg-gray-200 rounded-full h-4">
    <div
      className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-in-out"
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
  <p className="text-sm text-gray-600 mt-1">
    {completed} of {total} resources completed ({percentage}%)
  </p>
</div>

    </div>
  );
};

export default LearningPlanDetail;
