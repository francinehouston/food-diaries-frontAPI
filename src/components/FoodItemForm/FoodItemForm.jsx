import { useState } from "react";

const FoodItemForm = ({ foodDiaryId, onFoodItemAdded }) => {
  const [foodItem, setFoodItem] = useState({
    name: "",
    calories: "",
    description: "",
  });

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem({
      ...foodItem,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: ensure name and calories are filled out
    if (!foodItem.name || !foodItem.calories) {
      alert("Please provide both food name and calories.");
      return;
    }

    // Call the onFoodItemAdded function passed via props
    // You can add more fields as needed for the food item
    onFoodItemAdded(foodItem);

    // Clear the form after submission
    setFoodItem({
      name: "",
      calories: "",
      description: "",
    });
  };

  return (
    <div>
      <h3>Add a Food Item</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Food Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={foodItem.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={foodItem.calories}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description (optional):</label>
          <textarea
            id="description"
            name="description"
            value={foodItem.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Add Food Item</button>
        </div>
      </form>
    </div>
  );
};

export default FoodItemForm;
