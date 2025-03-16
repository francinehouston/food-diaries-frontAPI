import { useState,useEffect } from "react";
import foodDiaryService from "../../services/foodDiaryService";

const FoodDiaryForm = ({ foodDiaryId, handleSubmit }) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [mealType, setMealType] = useState("breakfast");
  const [notes, setNotes] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [foodItemName, setFoodItemName] = useState("");
  const [foodItemCalories, setFoodItemCalories] = useState("");
  const [date, setDate] = useState(new Date());

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFoodDiaryEntry = async () => {
      if (!foodDiaryId) return; // Don't try to fetch if no foodDiaryId exists.
      try {
        const response = await fetch(`/api/food-diary/${foodDiaryId}`);
        const data = await response.json();
        setName(data.name);
        setCalories(data.calories);
        setMealType(data.mealType);
        setNotes(data.notes);
        setFoodItems(data.foodItems);
        setDate(new Date(data.date).toISOString().split("T")[0]);
      } catch (error) {
        console.error("Error fetching food diary entry:", error);
      }
    };

    fetchFoodDiaryEntry();
  }, [foodDiaryId]);

  const handleFoodItemSubmit = (e) => {
    e.preventDefault();
    setFoodItems([...foodItems, { name: foodItemName, calories: foodItemCalories }]);
    setFoodItemName('');
    setFoodItemCalories('');
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const newFoodDiaryEntry = { name, calories, notes, mealType, foodItems, date };
    handleSubmit(newFoodDiaryEntry); // Pass the data to the parent or handle submission logic
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedFoodDiaryEntry = { name, calories, notes, mealType, foodItems, date };
    try {
      await foodDiaryService.update(foodDiaryId, updatedFoodDiaryEntry, token);
      console.log("Food diary entry updated successfully!");
    } catch (error) {
      console.error("Error updating food diary entry:", error);
    }
  };

  return (
    <>
    <form onSubmit={foodDiaryId ? handleUpdateSubmit : handleCreateSubmit}>
      <h3>{foodDiaryId ? "Edit Food Diary" : "Create New Food Diary"}</h3>
      <input type="text" placeholder="Food Diary Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Total Calories" value={calories} onChange={(e) => setCalories(e.target.value)} required />
      <select value={mealType} onChange={(e) => setMealType(e.target.value)} required>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snack">Snack</option>
      </select>
      <textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

      <h3>Add Food Item</h3>
      <input type="text" placeholder="Food Item Name" value={foodItemName} onChange={(e) => setFoodItemName(e.target.value)} />
      <input type="number" placeholder="Food Item Calories" value={foodItemCalories} onChange={(e) => setFoodItemCalories(e.target.value)} />
      <button onClick={handleFoodItemSubmit}>Add Food Item</button>

      <ul>
        {foodItems.map((item, index) => (
          <li key={index}>
            {item.name} - {item.calories} kcal
          </li>
        ))}
      </ul>

      {/* Separate buttons for Create and Update */}
      {foodDiaryId ? (
        <button type="submit">Update</button>
      ) : (
        <button type="submit">Create</button>
      )}
    </form>
    </>
  );
};


export default FoodDiaryForm;
