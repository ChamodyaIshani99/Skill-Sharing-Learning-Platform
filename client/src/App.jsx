import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LearningPlansPage from "./pages/LearningPlansPage";
import Footer from "./components/Footer";
import LearningPlanDetail from "./pages/LearningPlanDetails";

function App() {
  
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home or default page */}
        <Route path="/" element={<h1 className="text-center mt-10 text-2xl">Welcome to SkillTribe</h1>} />

        {/* Learning Plan Page */}
        <Route path="/learning-plan" element={<LearningPlansPage />} />
         <Route path="/plans/:id" element={<LearningPlanDetail />} />
      </Routes>
      {/* Footer at the bottom */}
      <Footer />
    </>
  )
}

export default App;
