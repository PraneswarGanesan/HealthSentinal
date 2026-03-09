#!/bin/bash

echo "Running DOCUMENT LIST benchmark..."

autocannon \
-c 10 \
-d 12 \
"http://127.0.0.1:8000/documents/?user_id=8747b4a4-afd3-4df8-8fe2-950bb6ea9854" \
--renderStatusCodes \
> ../results/documents_results.txt

echo "Documents benchmark completed"