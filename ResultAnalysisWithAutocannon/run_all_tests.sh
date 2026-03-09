#!/bin/bash

echo "======================================"
echo "HealthSentinal Benchmark Runner"
echo "======================================"

BASE_DIR=$(pwd)

mkdir -p results

echo ""
echo "Step 1: Running LOGIN benchmark"
echo "--------------------------------"

cd benchmarks
bash login_test.sh
sleep 4

echo ""
echo "Step 2: Running DOCUMENT LIST benchmark"
echo "--------------------------------"

bash documents_test.sh
sleep 4

echo ""
echo "Step 3: Running QUERY benchmark (Ollama)"
echo "--------------------------------"

bash query_test.sh

cd "$BASE_DIR"

echo ""
echo "Step 4: Generating performance graphs"
echo "--------------------------------"

# ensure python runs inside project venv
if [ -d "../venv" ]; then
    source ../venv/bin/activate
fi

python scripts/generate_graphs.py

echo ""
echo "======================================"
echo "Benchmark Complete"
echo "Results stored in: ResultAnalysis/results"
echo "======================================"