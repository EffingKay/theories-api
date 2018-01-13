# GoTheory API
 * [Overview](#overview)
 * [Local setup](#local-setup)
 * [Operations](#operations)
  * [Users](#users)
  * [Theories](#theories)
  * [Authentication](#authentication)


## Overview

HTTP REST API for [insertClientLinkHere](), 

Base URL is [https://vast-meadow-71975.herokuapp.com](https://vast-meadow-71975.herokuapp.com/)

## Local setup
Prerequisites: MongoDB and mongo running locally (mongod)

```
npm i 
node db/seeds.js
nodemon
```


## Operations
### Users
| Endpoint | Method | Protected |  Response
| --- | --- | --- | --- |
| /users| GET | true | array of user objects
| /users | POST | true | user object
| /users/:id | GET | true | user object
| /users/:id | PUT | true | user object
| /users/:id | PATCH | true | user object
| /users/:id | DELETE | true | only status code

### Theories
| Endpoint | Method | Protected |  Response
| --- | --- | --- | --- |
| /theories| GET | false
| /theories | POST | true
| /theories/:id | GET | true
| /theories/:id | PUT | true
| /theories/:id | PATCH | true
| /theories/:id | DELETE | true

### Authentication
| Endpoint | Method | Protected |  Response
| --- | --- | --- | --- |
| /login| POST | false | message, user, token
| /register | POST | false | message, user, token
