# Default Nestjs App

> Default nestjs app is an starter project or a template that follow some default configurations and ways of create an nestjs app. The goal of this project is to have a secure API configuration for the web. Already have connection with two databases (currently: Postgres and Redis).

## .ENV

For run this project you need a .env file which has the following variables:

```
JWTSECRET = "some_hash",
DATABASE_URL="postgresql://<user>:<passowrd>@url:port/db?schema=public"
REDIS_URI = "redis url"
REDIS_PORT = redis port
REDIS_PASS = "redis pass"
SEND_GRID_KEY = "sendgrid key"
SEND_GRID_VALID_EMAIL = "sendgrid valid email"
// Cors config
URL = "http://localhost:3333"
LANDING_URL = "http://localhost:5500"
PLATFORM_URL = "http://localhost:3000"
OTHERS_URLS = "https://url.com;https://url2.com"
LOG_REQUESTS = "true"
NODE_ENV = "development"
```

> You should change the data for your working databases and secure hashes

## To-do-list

- [ ] Add Amazon Cloud Storage (An default image upload);
- [ ] Add Google Cloud Storage (An default image upload).
