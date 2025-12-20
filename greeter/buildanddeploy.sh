#!/bin/bash
echo "Building Docker image..."

docker build -t cupaxx/greeter .
cmd1="docker tag cupaxx/greeter cupaxxhd/greeter"
eval $cmd1
cmd2="docker push cupaxxhd/greeter"
eval $cmd2