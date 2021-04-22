import axios from 'axios'

export const request = axios.create({
  baseURL: "http://localhost:8080",//改成谢霖枫的ip地址
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    return Promise.reject(error);
  }
);
