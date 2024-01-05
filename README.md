# Notes on how to do NestJS authentication and authorization

## Installation

```bash
$ yarn install
```

## Running the app

```bash
$ . ./environments_example.sh


# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

[MIT licensed](LICENSE)

## Demo

docs: https://docs.nestjs.com/recipes/passport

hit `http://localhost:3001/v0.0.1/private` or

`curl -X POST http://localhost:3001/v0.0.1/private`

you will get:

```
{
    "message": "Unauthorized",
    "statusCode": 401
}
```

to get the access token

hit `http://localhost:3001/v0.0.1/access-token` or

`curl -X GET http://localhost:3001/v0.0.1/access-token`

you will get:

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
}
```

pass the token header as Authorization Bearer

```
curl -X POST http://localhost:3001/v0.0.1/private -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
```

you will get:

```JSON
{"message":"This is a private route"}
```
