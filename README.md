# Custom Youtube feed API

This API offers a personalized experience for its users by enabling the creation of a youtube feed based on tags and categories added by a logged-in user. Users can also associate their GitHub ID to display the GitHub topics used in their projects and repositories.
Link to production API : https://nest-api-sand.vercel.app/


## Features
1. Route visualization : CRUD for users, tags and categories. 
2. Topic retrieval from github repositories and custom youtube feed retrieval.
3. Integration of external APIs:
- YouTube API
- GitHub API
4. E2E testing:
- Tests for user and tag CRUD routes.
- Tests for github-topics and feed-youtube routes.
5. Deployment: Deployed on Vercel with Github CI/CD.

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

Create .env file to the project root and paste this :

```bash
  YOUTUBE_API_KEY=YOUR_KEY
```
Create youtube api key v3 :

To create your youtube api v3 key you need to have google account developer on https://console.cloud.google.com/, and follow documentation https://console.cloud.google.com/apis/library/youtube.googleapis.com.

1. Create a project or use an existing one.
2. Activate the YouTube Data API.
3. Generate an access token using OAuth 2.0 credentials.
4. Put your new api key in the .env file.

Start the server with the dev environnement.

```bash
  npm run start:dev
```

## How to test it ?

- You can go on postman and login to your account. After go here and test all routes locally or in production directly : https://blue-crater-195788.postman.co/workspace/nest-api~f1074b64-4aad-40b6-b686-c3638df112b8/request/31656301-17655352-0db6-44e5-a0ef-acf8fbb91955?action=share&creator=31656301&ctx=documentation


## Tech Stack

**App:** Node, Nest

**Database:** Docker, PostgreSql

**Test:** Jest

**Cloud:** Vercel


## Authors

- [@domov44](https://github.com/domov44)
- [@killian-habasque](https://github.com/killian-habasque)
