import React, { useState, useEffect } from "react";
import NutritionGoalsForm from "../NutritionGoalsForm/NutritionGoalsForm";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const NutritionGoals = () => {
  const [goals, setGoals] = useState([]); // Initialize goals state
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [token, setToken] = useState(localStorage.getItem("token")); // Get token from localStorage initially
  const navigate = useNavigate();

  const handleNewNutritionGoal = (newNutritionGoal) => {
    setGoals((prevGoals) => {
      if (!Array.isArray(prevGoals)) {
        console.error("prevGoals is not an array", prevGoals);
        return [newNutritionGoal]; // Return new array if it's not an array
      }
      const exists = prevGoals.some(
        (goal) => JSON.stringify(goal) === JSON.stringify(newNutritionGoal)
      );
      
      if (!exists) {
        return [...prevGoals, newNutritionGoal]; // Add new goal if it doesn't exist
      }
      return prevGoals; // Return the previous list if goal exists
    });
  };

  const handleDeleteNutritionGoal = (id) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  // Define the fetch function
  const fetchNutritionGoals = async () => {
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/nutrition-goals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`Error fetching nutrition goals: ${response.status} - ${errorDetails}`);
        throw new Error("Error fetching nutrition goals");
      }

      const data = await response.json();
      console.log("Nutrition goals fetched:", data);

      // Check if the fetched data is an array
      if (Array.isArray(data)) {
        setGoals(data); // Set goals state if data is an array
      } else {
        setGoals([]); // Set an empty array if the data is not an array
        console.error("Expected an array of goals, but received:", data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching nutrition goals:", error);
      setError('There was an issue fetching your nutrition goals. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchNutritionGoals = async () => {
      const response = await fetch('/api/nutrition-goals');
      const data = await response.json();
  
      // Check if the data is an array or a single object and handle accordingly
      const nutritionGoals = Array.isArray(data) ? data : [data]; // Convert to an array if it's a single object
      setNutritionGoals(nutritionGoals);
    };
  
    fetchNutritionGoals();
  }, []);
  

  return (
    <div>
      <h1>Nutrition Goals</h1> 
      <NutritionGoalsForm onNewNutritionGoal={handleNewNutritionGoal} />
      {error ? (
        <p>Error fetching nutrition goals: {error}</p>
      ) : goals.length > 0 ? (
        <div>
          <h2>Current Nutrition Goals</h2>

          {goals.map((goal,index) => (
            <div key={goal.id || index}>
              <p>Daily Calories: {goal.daily_calories_target}</p>
              <p>Protein: {goal.protein_target}</p>
              <p>Carbs: {goal.carbs_target}</p>
              <p>Fats: {goal.fats_target}</p>
              <p>Water Intake: {goal.water_intake_target}</p>
              <button onClick={() => handleDeleteNutritionGoal(goal.id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No nutrition goals set yet.</p>
      )}
    </div>
  );
};

export default NutritionGoals;
