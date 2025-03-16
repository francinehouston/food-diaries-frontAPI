const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/nutrition-goals`; // Correct variable name

// Create a new nutrition goal
export const createNutritionGoal = async (goal) => {
  try {
    const response = await fetch(BASE_URL, {  // Use BASE_URL instead of API_URL
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type to JSON
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(goal), // Convert the goal object to JSON
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json(); // Parse and return the response data
  } catch (error) {
    console.error("Error creating nutrition goal:", error);
    throw error; // Re-throw error to be handled in the component
  }
};

// Get all nutrition goals
export const getAllNutritionGoals = async () => {
  try {
    const response = await fetch(BASE_URL); // Use BASE_URL here as well

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json(); // Parse and return the response data
  } catch (error) {
    console.error("Error fetching nutrition goals:", error);
    throw error; // Re-throw error to be handled in the component
  }
};

export default { createNutritionGoal, getAllNutritionGoals };

