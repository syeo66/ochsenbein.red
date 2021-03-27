help:
	@echo "make build     Build the gatsby app."
	@echo "make develop   Start the gatsby app for development."
	@echo "make serve     Build and serve the gatsby app."
	@echo "make clean     Clean the build artifacts."
	@echo "make test      Run tests."

GATSBY=node_modules/.bin/gatsby
PRETTIER=node_modules/.bin/prettier

build: public
	@echo "Built!"

develop: node_modules
	${GATSBY} develop

format:
	${PRETTIER} --write "**/*.{js,jsx,ts,tsx,json,md}"

start: develop

serve: build
	${GATSBY} serve

clean: node_modules
	${GATSBY} clean

test: node_modules
	@echo "Write tests! -> https://gatsby.dev/unit-testing"

######################################################################

public : node_modules src
	${GATSBY} build

node_modules : yarn.lock
	yarn
