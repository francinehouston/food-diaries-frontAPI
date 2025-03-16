import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from "../../contexts/UserContext";
// Assuming you have a UserContext for the logged-in user
import { getAllReminders,createReminder,deleteReminder } from '../../services/remindersService';

const RemindersForm = ({ onAddReminder }) => {
  const { userId } = useContext(UserContext);  // Get the userId from the context (assuming you have it)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
 const [error, setError] = useState(''); 

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Get token from storage
    console.log("Token being sent:", token);
    // Validate form fields
    if (!title || !date) {
      setError('Please provide both a title and a date.');
      return;
    }

    const newReminder = {
      userId,  // Include the userId in the reminder data
      title,
      description,
      date,
    };

    onAddReminder(newReminder);

    setTitle('');
    setDate("");
    setDescription("");
  

    try {
      // Use fetch instead of axios to post the data
      const response = await fetch('http://localhost:8000/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Tell the server that we're sending JSON
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({title,date}),  // Convert the object to a JSON string
      });

      if (!response.ok) {
        throw new Error('Error creating reminder: ' + response.status);
      }

      const data = await response.json();
      console.log('Reminder created:', data);

      // Optionally clear the form after submitting
      setTitle('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      onAddReminder(data);
      setError('');
    } catch (error) {
      console.error('Error creating reminder:', error);
      setError('There was an error creating the reminder.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Set a Reminder</h2>

      <input
        type="text"
        id="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        id="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button type="submit">Add Reminder</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default RemindersForm;
