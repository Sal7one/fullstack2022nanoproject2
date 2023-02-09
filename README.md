# Storefront Backend Project

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
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO saleh_dev;
GRANT ALL PRIVILEGES ON DATABASE store_api_dev TO saleh_dev;
GRANT ALL PRIVILEGES ON DATABASE store_api_test TO saleh_dev;
GRANT ALL PRIVILEGES ON DATABASE store_api_prod TO saleh_dev;

```

There is a ".env.example" file provided please put the credentials then rename it to be ".env"

After that to test the application you can run

`npm run test`

and if you want to run the "Dev" version run below commands

`db-migrate up`