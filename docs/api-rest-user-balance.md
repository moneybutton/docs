---
id: api-rest-user-balance
title: User Balance
---

Returns the balance for the specified user.

## Facts.

| Attribute      | Value                                                      |
|----------------|------------------------------------------------------------|
| url            | `https://www.moneybutton.com/api/v1/users/{userId}/balance` |
| http verb      | `GET`                                                      |
| Required scope | `users.balance:read`


### URL

* userId: The user who the balance is being requested.

## Example Response

``` json
{
	"data": {
		"type": "amounts",
		"id": "fa7f9720-c51d-11e9-8504-8bc4464406ab",
		"attributes": {
			"amount": 124.89582116461148,
			"currency": "USD",
			"satoshis": "91778675"
		}
	}
}
```

## Using our js api client

``` js
const { id: userId } = await mbClient.getUserIdentity()
const balance = await mbClient.getUserBalance(userId)
console.log(JSON.strigify(balance))
// Output:
// {
//   amount: 122.34489772156972,
//   currency: "USD",
//   satoshis:"90944709"
// }
```
