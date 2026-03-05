import streamlit as st
import requests

API_URL = "http://127.0.0.1:8000"

st.title("HealthSentinal")
st.subheader("Secure Healthcare RAG System")

st.markdown("Upload medical documents and query them securely.")

# Upload section
st.header("Upload Medical Document")

uploaded_file = st.file_uploader("Choose a file", type=["txt","pdf","csv"])

if uploaded_file is not None:

    if st.button("Upload"):

        files = {"file": (uploaded_file.name, uploaded_file.getvalue())}

        response = requests.post(f"{API_URL}/upload", files=files)

        if response.status_code == 200:
            st.success("Document uploaded and signed with Dilithium2")
        else:
            st.error("Upload failed")


# Query section
st.header("Ask Medical Question")

query = st.text_input("Enter your question")

if st.button("Ask"):

    if query.strip() != "":

        response = requests.post(
            f"{API_URL}/query",
            params={"question": query}
        )

        if response.status_code == 200:
            data = response.json()

            st.subheader("Answer")
            st.write(data["answer"])

        else:
            st.error("Query failed")