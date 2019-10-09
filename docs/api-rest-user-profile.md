---
id: api-rest-user-profile
title: User Profile
---

Returns profile info for the specified user..

## Facts.

| Attribute | Value                                                           |
|-----------|-----------------------------------------------------------------|
| url            | `https://www.moneybutton.com/api/v1/users/{userId}/profile` |
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
      "name": "John Doe",
      "default-currency": "USD",
      "default-language": "en",
      "bio": "I looooooooooooooooove Money Button.",
      "primary-paymail": "johndoe@example.com",
      "avatar-url": "https://www.example.com/avatar.png"
    }
  }
}
```

## Using our js api client

``` js
const { id: userId } = await mbClient.getUserIdentity()
const profile = await mbClient.getUserProfile(userId)
console.log(JSON.stringify(profile))
// Output:
// {
//   id: 7,
//   createdAt: "2019-06-24T17:08:48.201Z",
//   name: "John Doe",
//   defaultCurrency: "USD",
//   defaultLanguage: "en",
//   bio: "I looooooooooooooooove Money Button.",
//   primaryPaymail: "johndoe@example.com",
//   avatarUrl: "https://www.example.com/avatar.png"
// }
```
