// Reminders.jsx

import React, { useState,useEffect,} from 'react';
import RemindersForm from "../RemindersForm/RemindersForm";

 import { useNavigate } from "react-router-dom"; // Import useNavigate

const Reminders = () => {
  // State to hold reminders
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log('token');
    if(!token) {
      navigate("/login");  // Redirect to login page if token is missing
      return;
    }
 


    const fetchReminders = async () => {
     
      try {
      
        const response = await fetch("http://localhost:8000/reminders", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching reminders: ${response.status}`);
        }

    //     const data = await response.json();
    //     setReminders(data);
    //   } catch (error) {
    //     console.error("Error fetching reminders:", error);
    //     setError("Failed to load reminders.");
    //   }
    // };
    const data = await response.json();
    setReminders(data);
  } catch (err) {
    console.error("Error fetching reminders:", error);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

    fetchReminders();
  }, []);
 

  const handleNewReminder = (newReminder) => {
    setReminders((prevReminders) => [...prevReminders, newReminder]);
  };
  // Handle adding a reminder
  const handleAddReminder = (newReminder) => {
    // Validate that title and time are provided
    if (!newReminder.title || !newReminder.date) {
      setError('Please provide both a title and a date.');
      return;
    }

    // Convert time to a Date object
    const reminderDate = new Date(newReminder.date);

    // Validate that the time is a future time
    if (reminderDate <= new Date()) {
      setError('Please set a time in the future.');
      return;
    }

    setError(''); // Clear error if inputs are valid

    // Add the new reminder to the list
    setReminders([...reminders, { ...newReminder, id: Date.now() }]);
  };

  // Handle deleting a reminder
  const handleDeleteReminder = (id) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updatedReminders);
  };

  return (
    <div className='reminders'>
      <h1>Set a Reminder</h1>
      
      {/* Include the RemindersForm component and pass handleAddReminder as a prop */}
      <RemindersForm onAddReminder={handleAddReminder} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

       {loading ? (
        <p>Loading reminders...</p>
      ) : (
        <>
          <h2>Your Reminders</h2>
          {reminders.length === 0 ? (
            <p>No reminders set.</p>
          ) : (
            <ul>
              {reminders.map((reminder) => (
                <li key={reminder.id} className='reminder-item'>
                  <strong>{reminder.title}</strong> - {reminder.date}
                  <p>{reminder.description || 'No description available'}</p>
                  <button onClick={() => handleDeleteReminder(reminder.id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Reminders;
