# Dockerized MERN Microservice

## Ingredients:

1. Node.js
2. Express.js
3. MongoDB

## To run in development mode:

`docker-compose up --build`

This repository includes `nodemon` which will automatically reload when the source code
is edited locally.

## Architecture:

- `src/start.ts` is the module which bootstraps the Express.js server startup.
- `src/app.ts` holds the initialization of the Express.js application.
- `src/routes/` holds the routes which are given to the server in `src/app.ts`.
  - The naming convention for routes is `<name>.routes.ts`.
- `src/controllers/` holds the controllers which are evoked by the routes.
  - The naming convention for controllers is `<name>.controller.ts`.
- `src/services/` holds the business logic which is evoked by the controllers.
  - The naming convention for services is `<name>.service.ts`.
- `src/repository/` holds the repository logic which is evoked by the services to interact with the database.
  - The naming convention for a repository is `<name>.repository.ts`.
- `src/models/` holds the Mongoose schemas for MongoDB collections.
  - The naming convention for a model is `<name>.model.ts`.
- `src/models/` holds the Mongoose schemas for MongoDB collections.
  - The naming convention for a model is `<name>.model.ts`.
- `src/mappers/` holds mappers to convert a data transfer object (controller) to a domain object (service) to an entity/model (repository).
  - The naming convention for a model is `<name>.model.ts`.
- `src/types/` holds global types.
  - The naming convention for a global type file is `<name>.d.ts`.
- `src/middleware/` holds middleware.
- `src/utils/` holds utility modules.
- `src/__tests__/` holds Jest tests.
  - The naming convention for tests is `<name>.test.ts`.

```txt
[Request] -> Router -> Controller -> [DTO to Domain object] -> Service -> [Domain to Entity] -> Repositoy
```

TEST
