// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL:
//     import.meta.mode === "development" ? "http://localhost:5000/api" : "/api", // Backend API base URL
//   withCredentials: true, // Include cookies in requests
// });

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // ← Make sure this is correct
  withCredentials: true,
});

export default axiosInstance;
