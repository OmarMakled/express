.PHONY: up
up:
	@docker-compose up -d

.PHONY: test
test:
	@docker-compose exec web npm run test

.PHONY: cron
cron:
	@docker-compose exec web npm run cron

.PHONY: lint-autofix
lint-autofix:
	@docker-compose exec -u 0 web npm run lint-autofix

.PHONY: stop
stop:
	@docker-compose stop