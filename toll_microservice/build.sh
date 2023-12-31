#!/bin/bash

# use this for docker-compose only to build and run
if [ "$1" == "up" ]; then
  docker-compose up --build -d
  docker-compose logs -f gateway receiver storer
elif [ "$1" == "down" ]; then
  docker-compose down
else
  echo "Usage: ./build.sh [up|down]"
fi
