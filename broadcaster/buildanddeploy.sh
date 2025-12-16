#!/bin/bash

echo "============================= Building Docker image ============================="
docker build -t cupaxx/broadcaster .
cmd1="docker tag cupaxx/broadcaster cupaxxhd/broadcaster"
eval $cmd1
echo "============================= Finish Docker image ============================="

echo "============================= Push Docker image ============================="
cmd2="docker push cupaxxhd/broadcaster"
eval $cmd2
echo "============================= Finish Push Docker image ============================="