const API_URL = import.meta.env.PROD 
  ? window.location.origin 
  : "http://localhost:3000";

export default API_URL;
