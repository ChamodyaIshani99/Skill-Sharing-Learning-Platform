import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LearningPlanForm from './components/LearningPlan/LearningPlanForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='p-4'>
        <Routes>
          <Route 
            path="/learning-plan" 
            element={<LearningPlanForm onSubmit={(data) => console.log(data)} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;