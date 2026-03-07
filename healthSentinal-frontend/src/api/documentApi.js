import api from "./axiosClient";

export const listDocuments = async () => {

  const user_id = localStorage.getItem("user_id");

  const res = await api.get(`/documents/?user_id=${user_id}`);

  return res.data;
};


export const getDocument = async (document_id) => {

  const res = await api.get(`/documents/${document_id}`);

  return res.data;
};


export const uploadDocument = async (file) => {

  const user_id = localStorage.getItem("user_id");

  const formData = new FormData();

  formData.append("file", file);

  const res = await api.post(
    `/documents/upload?user_id=${user_id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return res.data;
};


export const updateDocument = async (document_id, file) => {

  const user_id = localStorage.getItem("user_id");

  const formData = new FormData();

  formData.append("file", file);

  const res = await api.put(
    `/documents/update/${document_id}?user_id=${user_id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return res.data;
};


export const deleteDocument = async (document_id) => {

  const user_id = localStorage.getItem("user_id");

  const res = await api.delete(
    `/documents/delete/${document_id}?user_id=${user_id}`
  );

  return res.data;
};