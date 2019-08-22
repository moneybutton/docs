---
id: api-rest-user-balance
title: User Balance
---

Returns the balance for the specified user.

## Facts.

| Attribute      | Value                                                      |
|----------------|------------------------------------------------------------|
| url            | `https://www.moneybuton.com/api/v1/users/{userId}/balance` |
| http verb      | `GET`                                                      |
| Required scope | `users.balance:read`


### URL

* userId: The user who the balance is being requested.

## Example Response

``` json
{
	"data": {
		"type": "users",
		"id": "fa7f9720-c51d-11e9-8504-8bc4464406ab",
		"attributes": {
			"amount": 124.89582116461148,
			"currency": "USD",
			"satoshis": "91778675"
		}
	}
}
```
