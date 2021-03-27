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
