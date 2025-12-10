#!/bin/bash

echo "============================= Building Docker image ============================="
docker build -t cupaxx/hourly-image .
cmd1="docker tag cupaxx/hourly-image cupaxxhd/hourly-image"
eval $cmd1
echo "============================= Finish Docker image ============================="

echo "============================= Push Docker image ============================="
cmd2="docker push cupaxxhd/hourly-image"
eval $cmd2
echo "============================= Finish Push Docker image ============================="