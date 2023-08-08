CONTAINER_NAME=front_bioinf
CONTAINER_ID=$(shell docker ps | grep ${CONTAINER_NAME} | grep -oE "^\w+")


build:
	DOCKER_BUILDKIT=1 docker build -t ${CONTAINER_NAME} .

run:
	docker run \
	    -v $(shell pwd):/${CONTAINER_NAME} \
		-p 3000:3000 \
	    ${CONTAINER_NAME}

bash:
	docker run -it \
	    -v $(shell pwd):/${CONTAINER_NAME} \
	    ${CONTAINER_NAME} /bin/bash

stop:
	docker stop ${CONTAINER_ID}

attach:
	docker exec -it ${CONTAINER_ID} /bin/bash

kill:
	docker kill ${CONTAINER_ID}

killall:
	docker kill $(shell docker ps -q)

# You can use it in case of unexpected failures. IT CLEANS DOCKER CACHE!!!
clean-docker:
	docker stop $(shell docker ps -a -q)
	docker system prune -a


push:
	git commit -a && git push

