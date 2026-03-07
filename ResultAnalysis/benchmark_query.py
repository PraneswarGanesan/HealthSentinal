import requests
import time
import json

URL = "http://127.0.0.1:8000/query/"

payload = {
    "user_id": "b7496816-1d9d-43da-b81b-0d3107ab22ee",
    "question": "what does praneswar has"
}

runs = 3
results = []

print("Running Query Benchmark...\n")

for i in range(runs):
    print(f"Run {i+1}")

    start = time.time()

    response = requests.post(URL, json=payload)

    end = time.time()

    latency = end - start

    print("Status:", response.status_code)
    print("Latency:", round(latency, 2), "seconds\n")
    print("Response: ", response)

    results.append({
        "run": i+1,
        "latency_seconds": latency,
        "status": response.status_code,
        "response": response
    })

avg_latency = sum(r["latency_seconds"] for r in results) / len(results)

summary = {
    "runs": runs,
    "average_latency": avg_latency,
    "results": results
}

with open("results/query_results.json", "w") as f:
    json.dump(summary, f, indent=4)

print("Benchmark completed")
print("Average latency:", round(avg_latency,2), "seconds")