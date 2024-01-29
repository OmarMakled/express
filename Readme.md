# Installation

To start the project you need to run `make up` it will pull the images if not exists and spin up the containers.

Run `make stop` to close containers

### Run test

`make test`

### Run cron

`make cron`

### lint-autofix

`make lint-autofix`

### API

base url `http://localhost:3000`

`GET /api/air_quality?lat=optional&lon=optional` the default current location

```
{
	"Result": {
		"Pollution": {
			"ts": "2024-01-29T09:00:00.000Z",
			"aqius": 134,
			"mainus": "p2",
			"aqicn": 68,
			"maincn": "p2"
		}
	}
}
```

`GET /api/most_polluted`

```
{
	"Result": {
		"Pollution": {
			"ts": "2024-01-29T13:00:00.000Z",
			"aqius": 33,
			"mainus": "p2",
			"aqicn": 11,
			"maincn": "p2"
		}
	}
}
```
