# A Koa authentication demo for practice
## Requirements
* node > 7.6
* mongodb > 3.4

## Start
```bash
$ cd koa-demo
$ npm install
$ DEBUG=* npm start
```
Then the server will run at [http://localhost:4000](http://localhost:4000).

## APIs
### Authorization
#### POST -> /auth/register
* register a account
* arguments
    - body
        - type: application/json
        - e.g.
        ```json
        {
            "username": "user",
            "password": "abc123",
            "email": "user@gmail.com",
            "phone": "0912345678",
            "birthday": "1999/11/11"
        }
        ```
* response
    - application/json
    - e.g.
    ```json
    {
        "code": 200,
        "message": "success",
        "data": "a user has been created"
    }
    ```
#### POST -> /auth/login
* login a account
* arguments
    - body
        - type: application/json
        - e.g.
        ```json
        {
            "username": "user",
            "password": "abc123",
        }
        ```
* response
    - application/json
    - e.g.
    ```json
    {
        "code": 200,
        "message": "success",
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE1MDQ2Mjc5NDR9.IGqxTQiSk-uGxBzWCxFXA-hqizUi6nfaES-gkGXjx9c"
        }
    }
    ```
#### POST -> /auth/logout
* logout a account (will clear cookies)
* arguments
    - None
* response
    - application/json
    - e.g.
    ```json
    {
        "code": 200,
        "message": "success",
        "data": {}
    }
    ```
### Users
#### GET -> /users/me
* get your user information
* arguments
    - query string
        - access_token: string
        - e.g.: `http://localhost:4000/users/me?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE1MDQ2Mjc5NDR9.IGqxTQiSk-uGxBzWCxFXA-hqizUi6nfaES-gkGXjx9c`
* response
    - application/json
    - e.g.
    ```json
    {
        "code": 200,
        "message": "success",
        "data": {
            "_id": "59aeccd8de41aa42ac39b4ae",
            "username": "user",
            "email": "user@gmail.com",
            "phone": "0912345678",
            "birthday": "1999/11/11"
        }
    }
    ```
#### GET -> /users/:username
* get a specific user information by `username`
* arguments
    - query string
        - access_token: string
        - e.g.: `http://localhost:4000/users/user?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE1MDQ2Mjc5NDR9.IGqxTQiSk-uGxBzWCxFXA-hqizUi6nfaES-gkGXjx9c`
* response
    - application/json
    - e.g.
    ```json
    {
        "code": 200,
        "message": "success",
        "data": {
            "_id": "59aeccd8de41aa42ac39b4ae",
            "username": "user",
            "email": "user@gmail.com",
            "phone": "0912345678",
            "birthday": "1999/11/11"
        }
    }
    ```
#### PUT -> /users/:username
* update a specific user information by `username`
* arguments
    - body
        - application/json
        - e.g.
        ```json
        {
            "password": "new_password",
            "email": "new_user@gmail.com",
            "phone": "0987654321",
            "birthday": "1999/11/11"
        }
        ```
* response
    - application/json
    - e.g.
    ```json
    {
        "code": 200,
        "message": "success",
        "data": {
            "_id": "59aeccd8de41aa42ac39b4ae",
            "username": "user",
            "email": "new_user@gmail.com",
            "phone": "0987654321",
            "birthday": "1999/11/11"
        }
    }
    ```
