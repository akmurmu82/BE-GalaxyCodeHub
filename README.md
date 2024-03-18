
# GalaxyCodeHub API Documentation

Welcome to the GalaxyCodeHub API documentation. This document provides detailed information on how to interact with our API to perform various user-related operations.

## Base URL

The base URL for all API endpoints is:

```
https://be-galaxy-code-hub.vercel.app/
```

## Authentication

To access protected endpoints, you need to authenticate using JSON Web Tokens (JWT). After successfully logging in, you will receive a JWT token that you need to include in the Authorization header of subsequent requests.

Example Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### User Registration

**POST /users/register**

Register a new user account.

Request Body:
- `username` (string, required): The username for the new account.
- `email` (string, required): The email address for the new account.
- `password` (string, required): The password for the new account.

Example Request:
```json
{
  "username": "example_user",
  "email": "example@example.com",
  "password": "password123"
}
```

### User Login

**POST /users/login**

Authenticate and log in a user.

Request Body:
- `username` (string, required): The username or email address of the user.
- `password` (string, required): The password of the user.

Example Request:
```json
{
  "username": "example_user",
  "password": "password123"
}
```

Example Response:
```json
{
  "token": "<JWT_TOKEN>"
}
```

### User Profile

**GET /users/profile**

Get the profile information of the authenticated user.

Example Response:
```json
{
  "username": "example_user",
  "email": "example@example.com"
}
```

## Error Handling

- **400 Bad Request**: Invalid request format or missing required parameters.
- **401 Unauthorized**: Authentication credentials are missing or invalid.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Server encountered an unexpected condition.
