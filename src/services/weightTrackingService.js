import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/weight-tracking`;

export const getWeightEntries = async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching weight entries:", error);
      return [];
    }
  };
  
  export const saveWeightEntry = async (entry) => {
    try {
      const response = await axios.post(BASE_URL, entry);
      return response.data;
    } catch (error) {
      console.error("Error saving weight entry:", error);
    }
  };



