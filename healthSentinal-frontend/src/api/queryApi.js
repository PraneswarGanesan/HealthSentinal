import api from "./axiosClient";

export const askQuery = async (question) => {

  const user_id = localStorage.getItem("user_id");

  const res = await api.post("/query/", {
    user_id: user_id,
    question: question
  });

  return res.data;
};