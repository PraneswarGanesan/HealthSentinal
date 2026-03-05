### Step 1 — Create a Virtual Environment

Create and activate a Python virtual environment.

```
python -m venv venv
venv\Scripts\activate
```

This ensures all dependencies are isolated for the project.

---

### Step 2 — Install and Setup Ollama

HealthSentinal uses a **local LLM via Ollama** to preserve healthcare data privacy.

Pull the required model:

```
ollama pull mistral
```

The **Mistral model** is chosen because it provides good performance while remaining lightweight enough for local inference.

Run the model locally:

```
ollama run mistral
```

Once this runs successfully, the local LLM server will be ready to handle RAG queries.

---

### Testing the Model

You can quickly test if the model is working by asking a simple question:

```
Explain asthma treatment
```

If the model responds correctly, the Ollama setup is functioning and ready for integration with the RAG pipeline.
