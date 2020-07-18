# ephy
Node.js api

#### auth (signup)
| Action| Endpoint | Functionality | 
|----------|----------|---------------|
| POST | `/api/users`  | Add a user|
| GET | `/api/users`  | Get all users|
| GET | `/api/users/:id`  | Get a single user|
| PUT | `/api/users/:id`  | Edit a user|
| DELETE | `/api/users/:id`  | Delete a user|

schema:
```json

  {
    "firstname": "ephy",
    "lastname": "kiki",
    "email": "ephy@xyz.com",
    "phone":"07xxxxxxxx",
    "password": "xxxxxx"
  }

```

### Prerequisites
- Node 8 or greater version
- Git

### Set up:
Setting up the app locally.
- Clone the repo
`git clone https://github.com/domanisamuel/ephy.git`

- Install the dependencies.
`npm install`
- Run app locally by starting the server
`nodemon app.js`