help:
	@echo "Docker compose help"
	@echo "---------------------"
	@echo "Commands List: "
	@echo ""
	@echo "migrate"
	@echo "makemigrations"
	@echo "shell"
	@echo "build"

migrate:
	@docker-compose run --rm server python manage.py migrate

makemigrations:
	@docker-compose run --rm server python manage.py makemigrations

shell:
	@docker-compose run --rm server python manage.py shell

build:
	@docker-compose build

test:
	@docker-compose run --rm server python manage.py test