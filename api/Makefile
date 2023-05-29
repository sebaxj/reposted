# Always consider the 'build' target out of date to force a build
.PHONY: build

# Docker Image name
IMAGE_NAME = $(shell pwd | xargs basename):$(shell git rev-parse --short HEAD)

# Docker Container name
CONTAINER_NAME = $(shell pwd | xargs basename)

# Docker ports
LOCAL_PORT = 8080
CONTAINER_PORT = 8080

# Default target
all: run

build:
	docker build -t $(IMAGE_NAME) .

run: build
	docker run --restart unless-stopped -p $(LOCAL_PORT):$(CONTAINER_PORT) --name $(CONTAINER_NAME) $(IMAGE_NAME)

clean:
	docker rm /$(CONTAINER_NAME) && docker rmi $(IMAGE_NAME)
