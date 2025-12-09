#!/bin/bash
echo "Building Docker image..."

docker build -t cupaxx/ping-pong .
cmd1="docker tag cupaxx/ping-pong cupaxxhd/ping-pong"
eval $cmd1
cmd2="docker push cupaxxhd/ping-pong"
eval $cmd2