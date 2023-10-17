# ZoomInfo Student CRUD Sample Application

## Back End

All commands assume you're in the `backend` directory in this project.

To get a working back end, make sure you have a running Postgres server.
Update the `.env` file with the connection string to your server.

Then:

1. Install deps:

```bash
npm install
```

2. Create and seed the db

```bash
npx prisma migrate dev --name init
```

3. Start the API server

```bash
npm run dev
```

The back end should now be listening for requests at `http://localhost:3001`.

The provided seed data has two sample students and five sample classes.
To validate the API is running, you can visit `http://localhost:3001/students/1` in your browser and validate that you get a response body with a student resource.

## Client

For expediency for this code challenge, the front end was built with Create React App (to get proxying and TS configuration for free, mostly). Navigate to the README in the `client` directory for more information (it's boilerplate CRA).

TL;DR:

All commands assume you're in the `client` directory of this project.

```
npm start
```

The app should be running at `http://localhost:3000/`.
