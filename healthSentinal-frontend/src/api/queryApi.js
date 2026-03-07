import api from "./axiosClient";

export const askQuery = async (query) => {

  const user_id = localStorage.getItem("user_id");

  const res = await api.post("/query/", {
    user_id,
    query
  });

  return res.data;
};