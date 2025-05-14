import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const LearningPlanDetail = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedResources, setCompletedResources] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/learning-plans/${id}`);
        setPlan(response.data);
        
        // Initialize expanded state for all topics
        const expandedState = {};
        response.data.topics?.forEach((_, index) => {
          expandedState[index] = true; // Set to true to expand by default
        });
        setExpandedTopics(expandedState);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching learning plan:", error);
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  const getRemainingDays = (endDate) => {
    const today = moment().startOf('day');
    const end = moment(endDate).startOf('day');
    const diff = end.diff(today, 'days');
    
    if (diff === 0) return "Due today";
    if (diff === 1) return "Due tomorrow";
    if (diff > 1) return `${diff} days remaining`;
    if (diff === -1) return "Overdue by 1 day";
    return `Overdue by ${Math.abs(diff)} days`;
  };

  const toggleResource = (topicIndex, resourceIndex) => {
    const key = `${topicIndex}-${resourceIndex}`;
    setCompletedResources((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleTopicExpansion = (topicIndex) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicIndex]: !prev[topicIndex],
    }));
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Learning plan not found
        </div>
      </div>
    );
  }

  const { completed, total, percentage } = getProgress();
  const remainingDays = getRemainingDays(plan.endDate);
  const isOverdue = remainingDays.includes("Overdue");

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{plan.title}</h1>
                <p className="mt-2 opacity-90">{plan.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${isOverdue ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                {remainingDays}
              </span>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Start: {moment(plan.startDate).format('MMM D, YYYY')}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>End: {moment(plan.endDate).format('MMM D, YYYY')}</span>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
              <span className="text-sm font-medium text-blue-600">
                {completed} of {total} ({percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Topics Section */}
          <div className="divide-y divide-gray-200">
            <h3 className="px-6 py-4 text-lg font-semibold text-gray-800">Learning Topics</h3>
            
            {plan.topics?.map((topic, topicIndex) => (
              <div key={topicIndex} className="p-6 hover:bg-gray-50 transition-colors">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleTopicExpansion(topicIndex)}
                >
                  <div className="flex items-center">
                    <h4 className="text-lg font-medium text-gray-900 flex items-center">
                      <span className="mr-3 text-blue-600">
                        {expandedTopics[topicIndex] ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </span>
                      {topic.name}
                    </h4>
                  </div>
                  <span className="text-sm text-gray-500">
                    {topic.resources?.length || 0} resources
                  </span>
                </div>
                
                {expandedTopics[topicIndex] && topic.resources && topic.resources.length > 0 && (
                  <ul className="mt-3 ml-8 space-y-3">
                    {topic.resources.map((resource, resourceIndex) => {
                      const key = `${topicIndex}-${resourceIndex}`;
                      const isCompleted = completedResources[key] || false;
                      return (
                        <li key={resourceIndex} className="flex items-start">
                          <button
                            type="button"
                            onClick={() => toggleResource(topicIndex, resourceIndex)}
                            className={`mt-1 flex-shrink-0 h-5 w-5 rounded border flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-100 border-green-500 text-green-700' : 'bg-white border-gray-300'}`}
                          >
                            {isCompleted && (
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                          <span className={`ml-3 ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {resource}
                            {isCompleted && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                Completed
                              </span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Completion Message */}
          {percentage === 100 && (
            <div className="bg-green-50 p-4 text-center">
              <div className="flex items-center justify-center text-green-800">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Congratulations! You've completed this learning plan!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningPlanDetail;