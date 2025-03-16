import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom"; // Import useNavigate
import WeightTrackingForm from "../WeightTrackingForm/WeightTrackingForm";

const WeightTracking = () => {
  const [weights, setWeights] = useState([]);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();  // Initialize navigate
  const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

  useEffect(() => {

    console.log("token", token);
    if (!token) {
      // console.log("No token found. Please login.");
      navigate("/login");  // Redirect to login page if token is missing
      return;
    }

    // Fetching the weight tracking entries if token exists
    const fetchWeightEntries = async () => {
      try {
        const response = await fetch("http://localhost:8000/weight-tracking", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        if (!response.ok) {
          const errorDetails = await response.text(); // Try to capture the error response text
          console.error(`Error fetching weight entries: ${response.status} - ${errorDetails}`);
          throw new Error("Error fetching weight entries");
        }

        const data = await response.json(); // Parse the response to JSON
        setWeights(data); // Set the state with the fetched data
      } catch (error) {
        console.error("Error fetching weight entries", error);
      }
    };

    fetchWeightEntries(); // Call the async function to fetch data
  }, [navigate]); // Only depend on navigate since token is handled in the effect itself

  const handleNewWeightEntry = (newWeight) => {
    setWeights((prevWeights) => [...prevWeights, newWeight]);
  }

  return (
    <div className="weight-tracking">
      <h1>Weight Tracking</h1>
      <WeightTrackingForm token={token} onNewEntry={handleNewWeightEntry} /> {/* Pass the token to the form */}

      <h2>Your Weight Entries</h2>
      <div className="card-container">
        {Array.isArray(weights) && weights.length > 0 ? (
          <div className="card-content">
            {weights.map((entry) => (
              <div key={entry._id} className="card-item">
                <div className="card-header">
                  {entry.date}: {entry.weight} lbs
                </div>
                <p>{entry.notes || 'No additional notes'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No weight entries found.</p>
        )}
      </div>

      <div className="card-footer">
        <p>Track your weight progress over time.</p>
      </div>
    </div>
  );
};

export default WeightTracking;
