// Create a new file, e.g., useOwnerData.js

import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../ConnectionServer"; // Make sure to import your BASE_URL

const useOwnerData = () => {
  const [ownerData, setOwnerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/owner/getAll`);
        setOwnerData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, []); // Empty dependency array ensures the effect runs once after the component mounts

  return { ownerData, loading, error };
};

export default useOwnerData;
