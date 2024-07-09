# BETEST API Documentation

## Overview

This document outlines the API endpoints and their usage for the Project BETEST.
This project using expressJs, Mongoose & redis.

## Authentication

All API endpoints except for `POST /api/auth/signup` and `POST /api/auth/login` require authentication using a JWT token passed in the `Authorization` header.

## Endpoints

### Signup

- **Method:** `POST`
- **Endpoint:** `/api/auth/signup`
- **Request Body:**
  ```json
  {
    "fullName": "string",
    "email": "string",
    "userName": "string",
    "password": "string"
  }


### Login

- **Method:** `POST`
- **Endpoint:** `api/auth/login`
- **Request Body:**
  ```json
  {
    "userName": "string",
    "password": "string"
  }

  
### Get user info by account number

- **Method:** `GET`
- **Endpoint:** `api/user/account-number/:accountNumber`


### Get user info by registration number

- **Method:** `GET`
- **Endpoint:** `api/user/registration-number/:registrationNumber`


### Get account login 3 days ago

- **Method:** `GET`
- **Endpoint:** `api/user/login-three-days-ago`


### Update account

- **Method:** `PUT`
- **Endpoint:** `api/account/:accountId`
- **Request Body:**
  ```json
  {
    "fullName": "string",
    "email": "string",
    "userName": "string",
    "password": "string"
  }


### Delete account

- **Method:** `DELETE`
- **Endpoint:** `api/account/:accountId`
