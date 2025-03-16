// remindersService.js
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reminders`;

// Get all reminders
export const getAllReminders = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error(`Error fetching reminders: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Add a new reminder
export const createReminder = async (reminder) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(reminder),
    });

    if (!response.ok) throw new Error(`Error adding reminder: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a reminder
export const deleteReminder = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error(`Error deleting reminder: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default{ getAllReminders, createReminder, deleteReminder };