#!/bin/bash
echo "Building Docker image..."

docker build -t cupaxx/log-output-reader .
cmd1="docker tag cupaxx/log-output-reader cupaxxhd/log-output-reader"
eval $cmd1
cmd2="docker push cupaxxhd/log-output-reader"
eval $cmd2