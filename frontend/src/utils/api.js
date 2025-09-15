import axios from "axios";

// Emulator ke liye IP (Android = 10.0.2.2, iOS = localhost)
const API = axios.create({
  baseURL: "http://10.0.2.2:3000/api", 
  timeout: 10000, // 10 sec timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
