import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for redirect

const WeightTrackingForm = ({onNewEntry}) => {
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();  // Use useNavigate hook for navigation
  
  const token = localStorage.getItem("token");
  
const handleSubmit = async (e) => {
    e.preventDefault();

    const newWeightTracking = {
      weight,
      date,
      notes,
    };

    try {
      const response = await fetch("http://localhost:8000/weight-tracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token for authorization
        },
        body: JSON.stringify({ weight, date }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Weight tracked:", data);
      setWeight("");
      setNotes("");
      onNewEntry(data);
    } catch (error) {
      console.error("Error tracking weight:", error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Track Your Weight</h2>

      <input
        type="number"
        placeholder="Weight (lbs)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />
      
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button type="submit">Track Weight</button>
    </form>
  );
};

export default WeightTrackingForm;
