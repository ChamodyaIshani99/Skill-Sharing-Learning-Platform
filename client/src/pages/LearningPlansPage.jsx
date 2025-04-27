import { useEffect, useState } from "react";
import { getAllPlans, createPlan, updatePlan, deletePlan } from "../api/learningPlanApi";
import LearningPlanForm from "../components/LearningPlan/LearningPlanForm";
import LearningPlanList from "../components/LearningPlan/LearningPlanList";
import LoadingSpinner from "../components/LearningPlan/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Plan from "../assets/plan.jpg";

const LearningPlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [totalPlans, setTotalPlans] = useState(0);
  const [pendingPlans, setPendingPlans] = useState(0);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await getAllPlans();
      setPlans(res.data);
      updatePlanCounts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load plans");
    }
    setLoading(false);
  };

  const updatePlanCounts = (plansData) => {
    setTotalPlans(plansData.length);
    const pending = plansData.filter(plan => 
      !plan.resources?.every(resource => resource.completed)
    ).length;
    setPendingPlans(pending);
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

  const handleResourceToggle = (updatedPlans) => {
    setPlans(updatedPlans);
    updatePlanCounts(updatedPlans);
  };

  return (
    <div className="p-8 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700">🎯 Learning Plans</h1>
        <button 
          onClick={() => setFormVisible(true)} 
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-all duration-300"
        >
          Add New Plan
        </button>
      </div>

      <div className="flex min-h-[70vh]">
        {/* Left side */}
        <div className="w-1/2 pl-16 pr-8 pt-8 bg-gray-100">
          <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transform transition-transform duration-300 hover:scale-105">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Total Plans</h5>
            <h1 className="text-6xl text-gray-700">{totalPlans}</h1>
          </div>
          <br />
          <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transform transition-transform duration-300 hover:scale-105">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Pending Plans</h5>
            <h1 className="text-6xl text-gray-700">{pendingPlans}</h1>
          </div>
          <br /><br />
          <button 
            type="button" 
            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => document.getElementById('all-plans').scrollIntoView({ behavior: 'smooth' })}
          >
            See All Plans
          </button>
        </div>

        {/* Right side */}
        <div className="w-1/2 flex justify-center items-start p-8 pr-24 -mt-8">
          <img src={Plan} alt="Plan" className="w-full max-w-lg rounded-3xl" />
        </div>
      </div>

      <br /><br />
      <h1 id="all-plans" className="text-2xl font-bold mb-4">All Plans</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <LearningPlanList 
          plans={plans} 
          onEdit={(plan) => { setSelectedPlan(plan); setFormVisible(true); }} 
          onDelete={handleDelete}
          onResourceToggle={handleResourceToggle}
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
