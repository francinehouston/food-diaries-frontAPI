import { useEffect, useState, useContext } from "react";
import foodDiaryService from "../../services/foodDiaryService";
import FoodDiaryForm from "../FoodDiaryForm/FoodDiaryForm";  // Correct relative path
import { UserContext } from "/src/contexts/UserContext.jsx";
import FoodItemForm from "../FoodItemForm/FoodItemForm"; // Correct path to FoodItemForm
import FoodItem from "../FoodItem/FoodItem";  // Assuming this is the component to display food items

const FoodDiary = () => {
    const { user } = useContext(UserContext);
    const [entries, setEntries] = useState([]);
    const [selectedFoodDiaryId, setSelectedFoodDiaryId] = useState(null); // Declare the state here
    const [error, setError] = useState(null); 
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                if (!token) {
                    throw new Error("No token found.");
                }
                const response = await foodDiaryService.getAllEntries(token);
                if (response.data) {
                    setEntries(response.data);
                }
            } catch (error) {
                console.error("Error fetching food diary entries", error);
                setError("Failed to fetch food diary entries. Please try again later.");
            }
        };
        fetchEntries();
    }, [token]);

    // Handler to update entries after form submission
    const handleEntryAdded = (newEntry) => {
        setEntries([...entries, newEntry]);
    };

    // Handler to update food items after they are added
    const handleFoodItemAdded = (newFoodItem) => {
        const updatedEntries = entries.map(entry => {
            if (entry._id === selectedFoodDiaryId) {
                return { ...entry, foodItems: [...entry.foodItems, newFoodItem] };
            }
            return entry;
        });
        setEntries(updatedEntries);
    };

    // Handler to delete a food diary entry
    const handleEntryDelete = async (entryId) => {
        try {
            // Make API call to delete the entry from the database
            await foodDiaryService.deleteEntry(entryId, token);
            
            // Update the state by filtering out the deleted entry
            const updatedEntries = entries.filter(entry => entry._id !== entryId);
            setEntries(updatedEntries);
        } catch (error) {
            console.error("Error deleting food diary entry", error);
        }
    };

    return (
        <div>
            <h2>Food Diary</h2>
        
            {/* Pass selectedFoodDiaryId to the FoodDiaryForm */}
            <FoodDiaryForm foodDiaryId={selectedFoodDiaryId} handleSubmit={handleEntryAdded} />

            {/* Show the form for adding food items */}
            {selectedFoodDiaryId && (
                <FoodItemForm
                    foodDiaryId={selectedFoodDiaryId}
                    onFoodItemAdded={handleFoodItemAdded}
                />
            )}

            {/* Render food diary entries */}
            {entries.map((entry,index) => (
                <div key={entry._id || index} className="food-entry">
                    <p><strong>Name:</strong> {entry.name}</p>
                    <p><strong>Calories:</strong> {entry.calories} kcal</p>
                    <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
                    <p><strong>Notes:</strong> {entry.notes}</p>

                    {/* Display food items within a meal */}
                    {entry.meals && entry.meals.map((meal, index) => (
                       <div key={meal._id || index}>  {/* Use meal._id or index as the key */}
                            <p className="meal-type"><strong>Meal Type:</strong> {meal.type}</p>
                            <p><strong>Food Items:</strong></p>   
                            <div key={foodItem._id} className="food-item">
                                  <h4>{foodItem.name}</h4>
                                  <p>{foodItem.calories} kcal</p>
                              </div>

                            {meal.foodItems.map((foodItem) => (
                               
                            
                                <FoodItem key={foodItem._id} foodItem={foodItem} />
                            ))}
                        </div>
                    ))}

                    {/* Button to set the selected food diary id */}
                    <button onClick={() => setSelectedFoodDiaryId(entry._id)}>
                        Add Food Item
                    </button>

                    {/* Edit button to set the selected food diary id */}
                    <button onClick={() => setSelectedFoodDiaryId(entry._id)}>
                        Edit
                    </button>

                    {/* Delete button to remove the entry */}
                    <button onClick={() => handleEntryDelete(entry._id)} style={{ color: 'white' }}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FoodDiary;
