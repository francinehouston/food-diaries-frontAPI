import { useContext } from 'react';
import { Routes, Route,  Navigate } from 'react-router-dom';  // Correct import from 'react-router-dom'
// import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import FoodDiary from './components/FoodDiary/FoodDiary.jsx';
import FoodItem from './components/FoodItem/FoodItem.jsx';
import WeightTracking from './components/WeightTracking/WeightTracking.jsx';
import WeightTrackingForm from './components/WeightTrackingForm/WeightTrackingForm.jsx';
import { UserContext } from './contexts/UserContext';  // Correct import
import NutritionGoalsForm from "./components/NutritionGoalsForm/NutritionGoalsForm";
import Reminders from './components/Reminders/Reminders';
import RemindersForm from './components/RemindersForm/RemindersForm.jsx';
import NutritionGoals from './components/NutritionGoals/NutritionGoals.jsx';
import { getAllReminders, createReminder, deleteReminder } from './services/remindersService';
import { createNutritionGoal, getAllNutritionGoals } from "./services/nutritionGoalsService";
import './App.css';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/login" element={<SignInForm />} />  {/* Add a /login route if it's missing */}
        
        <Route path="/food-diary" element={<FoodDiary />} />
        <Route path="/food-items" element={<FoodItem />} />
        <Route path="/weight-tracking" element={<WeightTracking />} />
        <Route path="/nutrition-goals" element={<NutritionGoals />} />
        <Route path="/reminders" element={<Reminders />} />
       
   
      
      </Routes>
    </>
  );
};

export default App;
