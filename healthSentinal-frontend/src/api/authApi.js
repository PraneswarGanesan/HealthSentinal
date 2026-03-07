import api from "./axiosClient";

export const signup = async (email, password) => {

  const res = await api.post("/auth/signup", {
    email,
    password
  });

  return res.data;
};

export const login = async (email, password) => {

  const res = await api.post("/auth/login", {
    email,
    password
  });

  return res.data;
};