const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/food-diary`;

// Fetch all entries
const getAllEntries = async (token) => {
    const response = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    },
    });

    if (!response.ok) {
        // Handle errors: Log the error and throw an exception
        const errorDetails = await response.text();  // Get the HTML error page content
        console.error(`Error fetching data: ${response.status} ${response.statusText}`, errorDetails);
        throw new Error(`Error fetching food diary entries: ${response.statusText}`);
    }

    const data = await response.json();  // Only try to parse JSON if response is OK
    return data;
};


// Show a single entry
const show = async (foodDiaryId) => {
    try {
        const res = await fetch(`${BASE_URL}/${foodDiaryId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (!res.ok) {
            const errorDetails = await res.text();
            console.error(`Error fetching entry with ID ${foodDiaryId}: ${errorDetails}`);
            throw new Error(`Error fetching food diary entry with ID ${foodDiaryId}: ${res.statusText}`);
        }

        // Check if response is JSON
        const contentType = res.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
            const errorDetails = await res.text();
            console.error("Expected JSON response, but received:", errorDetails);
            throw new Error("Expected JSON response, but received HTML or other content.");
        }

        return res.json();
    } catch (error) {
        console.error("Error in show function:", error);
        throw error;
    }
};

// Create a new food diary entry
const create = async (foodDiaryFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(foodDiaryFormData),
        });

        if (!res.ok) {
            const errorDetails = await res.text();
            console.error(`Error creating food diary entry: ${errorDetails}`);
            throw new Error(`Error creating food diary entry: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error("Error in create function:", error);
        throw error;
    }
};

// Delete a food diary entry
const deleteFoodDiary = async (foodDiaryId) => {
    try {
        const res = await fetch(`${BASE_URL}/${foodDiaryId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!res.ok) {
            const errorDetails = await res.text();
            console.error(`Error deleting food diary entry with ID ${foodDiaryId}: ${errorDetails}`);
            throw new Error(`Error deleting food diary entry with ID ${foodDiaryId}: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error("Error in deleteFoodDiary function:", error);
        throw error;
    }
};

// Update an existing food diary entry
const update = async (foodDiaryId, foodDiaryFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${foodDiaryId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(foodDiaryFormData),
        });

        if (!res.ok) {
            const errorDetails = await res.text();
            console.error(`Error updating food diary entry with ID ${foodDiaryId}: ${errorDetails}`);
            throw new Error(`Error updating food diary entry with ID ${foodDiaryId}: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error("Error in update function:", error);
        throw error;
    }
};

const foodDiaryService = { getAllEntries, show, create, deleteFoodDiary, update };

export default foodDiaryService;
