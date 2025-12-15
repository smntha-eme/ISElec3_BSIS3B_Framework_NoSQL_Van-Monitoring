import React, { createContext, useEffect, useState } from "react";
import API_URL from "../config";

export const VanContext = createContext();

export const VanProvider = ({ children }) => {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vans from backend
  const fetchVans = async () => {
    try {
      const res = await fetch(`${API_URL}/vans`);
      const data = await res.json();
      setVans(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching vans:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVans();
    const interval = setInterval(fetchVans, 5000); // live refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <VanContext.Provider value={{ vans, setVans, loading, fetchVans }}>
      {children}
    </VanContext.Provider>
  );
};
