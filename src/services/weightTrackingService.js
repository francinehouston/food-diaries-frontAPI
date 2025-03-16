import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/weight-tracking`;

// const weightTrackingService = {
//   /**
//    * Fetch all weight entries from the backend.
//    * @returns {Promise<Array>} - Resolves to an array of weight entries.
//    */
//   async getWeightEntries() {
//     try {
//       const response = await axios.get(BASE_URL);  // Fixed: Use BASE_URL instead of API_BASE_URL
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching weight entries:", error);
//       return [];
//     }
//   },

//   /**
//    * Save a new weight entry to the backend.
//    * @param {Object} entry - The weight entry object { weight, date, notes }.
//    * @returns {Promise<Object>} - Resolves to the saved weight entry.
//    */
//   async saveWeightEntry(entry) {
//     try {
//       const response = await axios.post(BASE_URL, entry);  // Fixed: Use BASE_URL instead of API_BASE_URL
//       return response.data;
//     } catch (error) {
//       console.error("Error saving weight entry:", error);
//     }
//   },
// };
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

// export weightTrackingService ={
//     getWeightEntries,
//     saveWeightEntry
// };

