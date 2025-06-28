// src/lib/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://your-api-url.com", // 🔁 Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
