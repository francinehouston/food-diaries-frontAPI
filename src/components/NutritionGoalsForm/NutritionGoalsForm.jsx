import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NutritionGoalsForm = ({ onNewNutritionGoal }) => {
  const [dailyCalories, setDailyCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [waterIntake, setWaterIntake] = useState("");
  const [submittedGoal, setSubmittedGoal] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const newGoal = {
      daily_calories_target: dailyCalories,
      protein_target: protein,
      carbs_target: carbs,
      fats_target: fats,
      water_intake_target: waterIntake,
    };

    try {
      const response = await fetch("http://localhost:8000/nutrition-goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newGoal),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // console.log("Fetched data:", data);
      console.log("Nutrition goal set:", data);

      // Clear form fields
      setDailyCalories("");
      setProtein("");
      setCarbs("");
      setFats("");
      setWaterIntake("");
      onNewNutritionGoal(data);
    } catch (error) {
      console.error("Error setting nutrition goal:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Set Your Nutrition Goals</h2>
      <label htmlFor="dailyCalories">Daily Calories</label>
      <input
        id="dailyCalories"
        type="number"
        placeholder="Daily Calories"
        value={dailyCalories}
        onChange={(e) => setDailyCalories(e.target.value)}
        required
      />

      <label htmlFor="proten">Protein</label>
      <input
        id="protein"
        type="number"
        placeholder="Protein (g)"
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
      />

      <label htmlFor="carbs">Carbs</label>
      <input
        id="carbs"
        type="number"
        placeholder="Carbs (g)"
        value={carbs}
        onChange={(e) => setCarbs(e.target.value)}
      />

      <label htmlFor="fats">Fats</label>
      <input
        id="fats"
        type="number"
        placeholder="Fats (g)"
        value={fats}
        onChange={(e) => setFats(e.target.value)}
      />
      <label htmlFor="waterIntake">Water Intake</label>
      <input
        id="waterIntake"
        type="number"
        placeholder="Water Intake (fl oz)"
        value={waterIntake}
        onChange={(e) => setWaterIntake(e.target.value)}
      />
      <button type="submit">Set Nutrition Goal</button>
    </form>
  );
};

export default NutritionGoalsForm;
