help:
	@echo "make build     Build the gatsby app."
	@echo "make develop   Start the gatsby app for development."
	@echo "make serve     Build and serve the gatsby app."
	@echo "make clean     Clean the build artifacts."

build: public
	@echo "Built!"

public : src
	gatsby build

develop:
	gatsby develop

format:
	prettier --write "**/*.{js,jsx,ts,tsx,json,md}"

start: develop

serve: build
	gatsby serve

clean:
	gatsby clean
