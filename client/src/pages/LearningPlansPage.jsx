import { useEffect, useState } from "react";
import { getAllPlans, createPlan, updatePlan, deletePlan } from "../api/learningPlanApi";
import LearningPlanForm from "../components/LearningPlan/LearningPlanForm";
import LearningPlanList from "../components/LearningPlan/LearningPlanList";
import LoadingSpinner from "../components/LearningPlan/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LearningPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await getAllPlans();
      setPlans(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load plans");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSave = async (plan) => {
    try {
      if (selectedPlan.id) {
        await updatePlan(selectedPlan.id, plan);
        toast.success("Plan updated successfully!");
      } else {
        await createPlan(plan);
        toast.success("Plan created successfully!");
      }
      fetchPlans();
      setFormVisible(false);
      setSelectedPlan({});
    } catch (err) {
      console.error(err);
      toast.error("Failed to save plan");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await deletePlan(id);
        toast.success("Plan deleted successfully!");
        fetchPlans();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete plan");
      }
    }
  };
  

  return (
    <div className="p-8 bg-gradient-to-tr from-blue-50 to-blue-100 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700">🎯 Learning Plans</h1>
        <button 
          onClick={() => setFormVisible(true)} 
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-all duration-300"
        >
          ➕ Add Plan
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <LearningPlanList 
          plans={plans} 
          onEdit={(plan) => { setSelectedPlan(plan); setFormVisible(true); }} 
          onDelete={handleDelete} 
        />
      )}

      {formVisible && (
        <LearningPlanForm
          onSave={handleSave}
          onCancel={() => { setFormVisible(false); setSelectedPlan({}); }}
          initialData={selectedPlan}
        />
      )}
    </div>
  );
};

export default LearningPlansPage;
