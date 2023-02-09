# Storefront Backend Project

### DB Setup is at the end of the document


# Api Refrence

Examples 


User route
### /users (GET)
ex:
```Auth: Bearer Token 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjc1OTMzNDc4fQ.R673TIT6Y5LzqAPxhlbkaqXfqqNxGgL5qsbNuIeJz9s
```

Response
```
{
    "users": [
        {
            "id": 1,
            "firstname": "Saleh",
            "lastname": "Alanazi"
        },
        {
            "id": 3,
            "firstname": "asd",
            "lastname": "asd"
        }
    ]
}

```

### /users/:id (GET)
ex: http://localhost:3000/users/2
```Auth: Bearer Token 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjc1OTMzNDc4fQ.R673TIT6Y5LzqAPxhlbkaqXfqqNxGgL5qsbNuIeJz9s
```

Response
```
{
    "user": {
        "id": 2,
        "firstname": "Saleh",
        "lastname": "Alanazi"
    }
}
```

### /users (POST)
AUTH: NONE

BODY RAW JSON
`
{
    "firstname": "asd",
    "lastname": "asd",
    "password": "asd"
}
`
Response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvdyI6Iig0LGFzZCxhc2QpIn0sImlhdCI6MTY3NTkzNDIyOX0.wAP5JTAs0883PFS87ebDRfvUyg7oem0fYKbEOTsLtcM"
}
```

**Create user**

```shell
CREATE USER full_stack_user WITH PASSWORD 'password1234';
```

**Create Databases**

```shell
#Dev Database
CREATE DATABASE store_api_dev;

#Test Database
CREATE DATABASE store_api_test;

#Prod Database
CREATE DATABASE store_api_prod;
```

**GRANT all privileges to the user in the created databases**

```shell
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO full_stack_user;
GRANT ALL PRIVILEGES ON DATABASE store_api_dev TO full_stack_user;
GRANT ALL PRIVILEGES ON DATABASE store_api_test TO full_stack_user;
GRANT ALL PRIVILEGES ON DATABASE store_api_prod TO full_stack_user;
```

There is a ".env.example" file provided please put the credentials then rename it to be ".env"

After that to test the application you can run

`npm run test`

and if you want to run the "Dev" version run below commands

`db-migrate up`


