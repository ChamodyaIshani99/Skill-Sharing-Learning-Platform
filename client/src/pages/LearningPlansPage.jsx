import { useEffect, useState } from "react";
import { getAllPlans, createPlan, updatePlan, deletePlan } from "../api/learningPlanApi";
import LearningPlanForm from "../components/LearningPlan/LearningPlanForm";
import LearningPlanList from "../components/LearningPlan/LearningPlanList";
import LoadingSpinner from "../components/LearningPlan/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pic from "../assets/pic.png";
import { Link } from "react-scroll";

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
      const cleanedPlans = res.data.map((plan) => ({
        ...plan,
        resources: plan.resources || [],
        topics: plan.topics || [],
      }));
      setPlans(cleanedPlans);
      updatePlanCounts(cleanedPlans);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load plans");
    }
    setLoading(false);
  };

  const updatePlanCounts = (plansData) => {
    setTotalPlans(plansData.length);
    const pending = plansData.filter((plan) => {
      const incompleteResources = plan.resources?.some((r) => !r.completed);
      const incompleteTopics = plan.topics?.some((t) => !t.completed);
      return incompleteResources || incompleteTopics;
    }).length;
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
    <div className="p-8 min-h-screen bg-gradient-to-br from-[#081b33] via-[#0a2351] to-[#0c2a63] text-white font-sans">
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
          🎯 Learning Plans
        </h1>
        <button
          onClick={() => setFormVisible(true)}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-600 shadow-lg transition-all duration-300"
        >
          ➕ Add New Plan
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative w-full mb-14 rounded-xl overflow-hidden shadow-xl bg-[#0f2e5a] p-10 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Build Your Learning Path
          </h2>
          <p className="text-lg text-gray-200">
            Create, track, and manage your goals in a structured roadmap that helps you stay focused
            and motivated. Your personalized learning journey starts here!
          </p>
          <Link to="all-plans" smooth duration={500}>
            <button className="bg-lime-400 text-black px-6 py-3 font-semibold rounded-lg shadow-md hover:bg-lime-300 transition-all duration-300">
              🚀 Get Started
            </button>
          </Link>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img src={pic} alt="Learning" className="rounded-lg shadow-lg max-h-[400px]" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#153b75] p-6 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-300">Total Plans</p>
          <h3 className="text-3xl font-bold text-blue-300">{totalPlans}</h3>
        </div>
        <div className="bg-[#16418a] p-6 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-300">Pending Plans</p>
          <h3 className="text-3xl font-bold text-yellow-300">{pendingPlans}</h3>
        </div>
        <div className="bg-[#1750a5] p-6 rounded-lg shadow-md text-center">
          <p className="text-sm text-gray-300">Completed Plans</p>
          <h3 className="text-3xl font-bold text-green-300">{totalPlans - pendingPlans}</h3>
        </div>
      </div>

      {/* Plan Section */}
      <h1 id="all-plans" className="text-3xl font-bold mb-4 border-b border-gray-500 pb-2">
        📋 All Learning Plans
      </h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <LearningPlanList
          plans={plans}
          onEdit={(plan) => {
            setSelectedPlan(plan);
            setFormVisible(true);
          }}
          onDelete={handleDelete}
          onResourceToggle={handleResourceToggle}
        />
      )}

      {formVisible && (
        <LearningPlanForm
          onSave={handleSave}
          onCancel={() => {
            setFormVisible(false);
            setSelectedPlan({});
          }}
          initialData={selectedPlan}
        />
      )}
    </div>
  );
};

export default LearningPlansPage;
