
![Logo](https://camo.githubusercontent.com/4b0000b8e7a6449a924fe0212093b9f3936ef80cc8fdfbb770baad58f58b8c2c/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f2d736d616c6c2e737667)


# Next API

This API generate you a custom Youtube feed from your custom tags.


## Run Locally

Clone the project into an existing directory

```bash
  git clone https://github.com/domov44/nest_api .
```

Build the database with docker

```bash
  docker compose up
```

Install dependencies

```bash
  npm install 
```

Migrate the database

```bash
  npm run migration:run  
```

Start the server

```bash
  npm run start:dev
```


## Features

- full api
- auth
- protected crud on tags and categories


## Roadmap

- Youtube feed generation

- Github integrations


## Tech Stack


**Server:** Node, Nest

**Database:** Docker, PostgreSql


## Authors

- [@domov44](https://github.com/domov44)
- [@killian-habasque](https://github.com/killian-habasque)