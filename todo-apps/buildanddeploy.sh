#!/bin/bash

echo "============================= Building Docker image ============================="
docker build -t cupaxx/todo-apps .
cmd1="docker tag cupaxx/todo-apps cupaxxhd/todo-apps"
eval $cmd1
echo "============================= Finish Docker image ============================="

echo "============================= Push Docker image ============================="
cmd2="docker push cupaxxhd/todo-apps"
eval $cmd2
echo "============================= Finish Push Docker image ============================="