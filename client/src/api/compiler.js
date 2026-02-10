import axios from "axios";

const API = "http://localhost:5000/api/compiler";

export const submitCode = (data) => {
  const token = localStorage.getItem("token");

  return axios.post(`${API}/submit`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSubmissions = () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API}/submissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
