help:
	@echo "make build     Build the gatsby app."
	@echo "make develop   Start the gatsby app for development."
	@echo "make serve     Build and serve the gatsby app."
	@echo "make clean     Clean the build artifacts."

build: public
	@echo "Built!"

develop: node_modules
	gatsby develop

format:
	prettier --write "**/*.{js,jsx,ts,tsx,json,md}"

start: develop

serve: build
	gatsby serve

clean: node_modules
	gatsby clean

######################################################################

public : node_modules src
	gatsby build

node_modules : package.json yarn.lock
	yarn
