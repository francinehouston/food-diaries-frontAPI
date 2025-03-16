
import React from 'react';

const FoodItem = ({ foodItem }) => {
  if (!foodItem) {
      return <p>Food item not available</p>; // Graceful fallback if foodItem is undefined
  }

  return (
      <div>
          <h4>{foodItem.name}</h4>
          <p>{foodItem.calories} kcal</p>
      </div>
  );
};

export default FoodItem;



