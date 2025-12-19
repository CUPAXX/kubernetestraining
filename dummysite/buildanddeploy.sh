#!/bin/bash

echo "============================= Building Docker image ============================="
docker build --no-cache -t cupaxxhd/dummysite-controller .
echo "============================= Finish Docker image ============================="

echo "============================= Push Docker image ============================="
cmd2="docker push cupaxxhd/dummysite-controller"
eval $cmd2
echo "============================= Finish Push Docker image ============================="