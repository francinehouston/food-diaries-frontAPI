const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/food-items`;

 const createFoodItem = async (foodItemData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(foodItemData),
      });
  
      // If the response is not OK, throw an error with status text
      if (!response.ok) {
        const errorMessage = await response.text(); // Capture server error response text
        throw new Error(`Error creating food item: ${errorMessage}`);
      }
  
      // If successful, return the response JSON
      return await response.json();
    } catch (error) {
      // Log the error and optionally return it
      console.error("Error:", error);
      return { error: error.message };  // Return the error to be handled by the caller
    }
  };

export
{createFoodItem,};