import React, { useState, useEffect } from "react";
import NutritionGoalsForm from "../NutritionGoalsForm/NutritionGoalsForm";
import { useNavigate } from "react-router-dom";

const NutritionGoals = () => {
  const [goals, setGoals] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // Ensure token is retrieved properly
  const navigate = useNavigate();

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
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`Error fetching nutrition goals: ${response.status} - ${errorDetails}`);
        throw new Error("Error fetching nutrition goals");
      }

      const data = await response.json();
      console.log("Fetched nutrition goals:", data);

      if (data && typeof data === "object") {
        setGoals([data]); // Convert object to an array for consistency
      } else {
        setGoals([]); // Set an empty array if no data
      }
    } catch (error) {
      console.error("Error fetching nutrition goals:", error);
      setError("There was an issue fetching your nutrition goals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNutritionGoals();
  }, []);

  const handleNewNutritionGoal = (newNutritionGoal) => {
    setGoals((prevGoals) => {
      if (!Array.isArray(prevGoals)) {
        console.error("prevGoals is not an array", prevGoals);
        return [newNutritionGoal];
      }
      return [...prevGoals, newNutritionGoal]; 
    });
  };

  const handleDeleteNutritionGoal = (id) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  return (
    <div>
      <h1>Nutrition Goals</h1>
      <NutritionGoalsForm onNewNutritionGoal={handleNewNutritionGoal} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : goals.length > 0 ? (
        <div>
          <h2>Current Nutrition Goals</h2>
          {goals.map((goal, index) => (
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