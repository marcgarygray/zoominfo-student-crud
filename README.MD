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

2. Migrate and seed the db

```bash
npx prisma migrate dev
```

3. Start the API server

```bash
npm run dev
```

The back end should now be listening for requests at `http://localhost:3001`.

The provided seed data has two sample students and five sample classes.
To validate the API is running, you can visit `http://localhost:3001/students/1` in your browser and validate that you get a response body with a student resource.

## Client

For expediency for this code challenge, the front end was built with Create React App (to get proxying, TS configuration, and other boilerplate needs). Navigate to the README in the `client` directory for more information (it's the default CRA README).

TL;DR:

All commands assume you're in the `client` directory of this project.

```
npm start
```

The app should be running at `http://localhost:3000/`.

## For the reviewer:

The instructions for this assignment indicate that using the least amount of third party libraries is preferable. While this makes perfect sense to me from the perspective of demonstrating technical knowledge and skills, it did put me in a difficult position of trying to decide where to select libraries versus hand-roll my own solution.
In the end, I decided to simply eschew any third party library aside from the ones called out in the task description (React, Prisma, Express, Jest).
I felt it would be better to take a little longer but show that I'm able to perform all of these tasks (table sorting/filtering) with hand-built components.
That being said, in a real app, I would strongly recommend using libraries for complex problems (server paginated / filtered / sorted tables, for example) and to reduce boilerplate code.
All of that to say: Preventing myself from using any UI libraries or pre-built components was a fun exercise, but it did mean I had to make some sacrifices along the way. 🙂
