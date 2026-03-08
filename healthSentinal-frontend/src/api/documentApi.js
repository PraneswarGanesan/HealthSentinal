import api from "./axiosClient";

/*
GET all documents for current user
*/
export const listDocuments = async () => {
  const user_id = localStorage.getItem("user_id");

  const res = await api.get(`/documents`, {
    params: { user_id }
  });

  return res.data;
};


/*
GET single document
*/
export const getDocument = async (document_id) => {
  const res = await api.get(`/documents/${document_id}`);
  return res.data;
};


/*
UPLOAD document
*/
export const uploadDocument = async (userId, formData) => {

  const res = await api.post(
    `/documents/upload`,
    formData,
    {
      params: { user_id: userId },
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return res.data;
};


/*
UPDATE document
*/
export const updateDocument = async (document_id, file) => {

  const user_id = localStorage.getItem("user_id");

  const formData = new FormData();
  formData.append("file", file);

  const res = await api.put(
    `/documents/update/${document_id}`,
    formData,
    {
      params: { user_id },
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return res.data;
};


/*
DELETE document
*/
export const deleteDocument = async (document_id) => {

  const user_id = localStorage.getItem("user_id");

  const res = await api.delete(
    `/documents/delete/${document_id}`,
    {
      params: { user_id }
    }
  );

  return res.data;
};