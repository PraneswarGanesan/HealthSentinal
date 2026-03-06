from llm.ollama_client import generate_response

prompt = "Explain diabetes in one sentence."

response = generate_response(prompt)

print("\nLLM RESPONSE:\n")
print(response)