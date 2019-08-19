---
id: api-rest-user-profile
title: User profile
---

Returns profile info for the specified user..

## Facts.

| Attribute | Value                                                           |
|-----------|-----------------------------------------------------------------|
| url            | `https://www.moneybuton.com/api/v1/users/{userId}/profile` |
| http verb      | `GET`                                                      |
| Required scope | `users.profiles:read`


## Attributes

### URL

* userId: The returned profile belongs to the user specified in this parameter.

## Response

``` json
{
  "data": {
    "type": "profiles",
    "id": "7",
    "attributes": {
      "created-at": "2019-06-24T17:08:48.201Z",
      "email": "john@doe.com",
      "name": "John Doe",
      "default-currency": "USD",
      "default-language": "en",
      "bio": "I looooooooooooooooove Money Button.",
      "primary-paymail": "johndoe@example.com"
    }
  }
}
```
