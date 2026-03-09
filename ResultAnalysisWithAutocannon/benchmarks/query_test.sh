#!/bin/bash

echo "Running QUERY benchmark (RAG + Ollama)..."

autocannon \
-c 2 \
-d 12 \
-m POST \
-H "Content-Type: application/json" \
-b "$(cat ../configs/query.json)" \
http://127.0.0.1:8000/query/ \
--renderStatusCodes \
> ../results/query_results.txt

echo "Query test completed"