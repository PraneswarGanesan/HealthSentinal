#!/bin/bash

echo "Running LOGIN benchmark..."

autocannon \
-c 10 \
-d 12 \
-m POST \
-H "Content-Type: application/json" \
-b "$(cat ../configs/login.json)" \
http://127.0.0.1:8000/auth/login \
--renderStatusCodes \
> ../results/login_results.txt

echo "Login test completed"