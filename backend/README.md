# Backend

## Routing Table

#### API (JSON)

Note that for all endpoints listed below the full pathname begins with http://localhost:8080/33156859/Ray/api/v1/

| Name              | Endpoint         | HTTP Method | Purpose                                          | Handler                        |
| ----------------- | ---------------- | ----------- | ------------------------------------------------ | ------------------------------ |
| create driver     | `/drivers`       | POST        | Creates a driver                                 | `(driver router) createOne`    |
| retrieve drivers  | `/drivers`       | GET         | Retrieves all the drivers with assigned packages | `(driver router) retrieveAll`  |
| update driver     | `/drivers`       | PATCH       | Updates a driver with new licence and department | `(driver router) updateOne`    |
| delete driver     | `/drivers/:id`   | DELETE      | Deletes a driver and all assigned packages       | `(driver router) deleteOne`    |
| create package    | `/packages`      | POST        | Creates a package                                | `(package router) createOne`   |
| retrieve packages | `/packages`      | GET         | Retrieves all the packages with assigned driver  | `(package router) retrieveAll` |
| update package    | `/packages`      | PATCH       | Updates a package with new destination           | `(package router) updateOne`   |
| delete package    | `/packages/:id`  | DELETE      | Deletes a package and unassigns it               | `(package router) deleteOne`   |
| user login        | `/auth/login`    | POST        | Logs a user into the app granting full access    | `loginUser`                    |
| user register     | `/auth/register` | POST        | Registers a user with a username and password    | `registerUser`                 |

## Bug Tracker

-   [ ] Drivers and packages could have duplicate IDs; current implementation will delete the first occurence if there are
        multiple packages or drivers with the same ID
