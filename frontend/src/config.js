// API URL Configuration
const API_URL = import.meta.env.VITE_API_URL || 
                (import.meta.env.PROD 
                  ? "https://iselec3-bsis3b-framework-nosql-van.onrender.com"
                  : "http://localhost:3000");

export default API_URL;
