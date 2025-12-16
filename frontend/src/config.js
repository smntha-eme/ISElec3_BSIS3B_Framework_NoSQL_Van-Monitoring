// API URL Configuration
// In production, this will use the VITE_API_URL environment variable if set
// Otherwise, it will use the same origin (for monolithic deployment)
// In development, it uses localhost:3000

const API_URL = import.meta.env.VITE_API_URL || 
                (import.meta.env.PROD 
                  ? window.location.origin 
                  : "http://localhost:3000");

export default API_URL;
