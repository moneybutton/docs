---
id: api-rest-get-payments
title: Get Payments
---

Retrieves the data related to a specific payment.

## Facts.

| Attribute      | Value                                                    |
|----------------|----------------------------------------------------------|
| url            | `https://www.moneybutton.com/api/v1/payments`             |
| http verb      | `GET`                                                    |
| Required scope | `payments:read` or `application_access:write`            |

## Attributes

### Query

* limit: Max amount of payments to return. Default 20.
* offset: Number of payments to skip.

## Example Response

``` json
{
  "data": [
    {
      "type": "payments",
      "id": "51",
      "attributes": {
        "created-at": "2019-07-16T13:54:17.609Z",
        "user-id": "7",
        "txid": null,
        "normalized-txid": "4bf355a3acba1cf69e76db52bce9236f481cd3e4cacc16b49224294c2567fb8f",
        "amount": "0.00918671551247386",
        "currency": "USD",
        "satoshis": "7507",
        "status": "FAILED",
        "status-description": "Timed out.",
        "button-id": "1563285222434",
        "button-data": "{\"unDato\": \"un valor loco\", \"unDatoCompuesto\": {\"coso\": 3, \"cosito\": \"valor del cosito\"}}",
        "amount-usd": "0.00918671551247386",
        "input-amount-usd": "116.75309980698881",
        "input-amount-satoshis": "95405754",
        "spend-amount-usd": "0.00028023949012342004",
        "spend-amount-satoshis": "229",
        "fee-amount-usd": "0.00028023949012342004",
        "fee-amount-satoshis": "229",
        "change-amount-usd": "116.74363285198622",
        "change-amount-satoshis": "95398018"
      },
      "relationships": {
        "payment-outputs": {
          "data": [
            {
              "type": "payment-outputs",
              "id": "54"
            }
          ]
        }
      }
    },
    {
      "type": "payments",
      "id": "77",
      "attributes": {
        "created-at": "2019-08-21T21:37:12.819Z",
        "user-id": "7",
        "txid": null,
        "normalized-txid": "dc734013433cca2cf15916e330acc65acbe35b4e4821479915a065c992a9cf4b",
        "amount": "0.9999997399525015",
        "currency": "USD",
        "satoshis": "746676",
        "status": "FAILED",
        "status-description": "Timed out.",
        "button-id": "1566423247979",
        "button-data": "{}",
        "amount-usd": "0.9999997399525015",
        "input-amount-usd": "122.91629988533867",
        "input-amount-satoshis": "91778675",
        "spend-amount-usd": "1.0003064324676607",
        "spend-amount-satoshis": "746905",
        "fee-amount-usd": "0.00030669251515935003",
        "fee-amount-satoshis": "229",
        "change-amount-usd": "121.91599345287102",
        "change-amount-satoshis": "91031770"
      },
      "relationships": {
        "payment-outputs": {
          "data": [
            {
              "type": "payment-outputs",
              "id": "82"
            }
          ]
        }
      }
    }
  ],
  "included": [
    {
      "type": "payment-outputs",
      "id": "54",
      "attributes": {
        "created-at": "2019-07-16T13:54:17.614Z",
        "to": "7",
        "amount": "1",
        "currency": "ALL",
        "satoshis": "7507",
        "type": "USER",
        "user-id": "7",
        "address": null,
        "script": null,
        "amount-usd": "0.009186954524575104",
        "user-paymail": "johndoe@example.com"
      }
    },
    {
      "type": "payment-outputs",
      "id": "82",
      "attributes": {
        "created-at": "2019-08-21T21:37:12.820Z",
        "to": "5",
        "amount": "1",
        "currency": "USD",
        "satoshis": "746676",
        "type": "USER",
        "user-id": "5",
        "address": null,
        "script": null,
        "amount-usd": "1",
        "user-paymail": "jennyrandom@example.io"
      }
    }
  ]
}
```

## Using our js api client

``` js
const mbClient = new MoneyButtonClient(CLIENT_IDENTIFIER, CLIENT_SECRET)
await mbClient.logInAsApp()
const payments = await mbClient.getOwnPayments()
const data = payments.map (p => ({id: p.id, amount: p.amount, currency: p.currency}))
console.log(data)
// Output:
// [
//   {
//     id: 51,
//     amount: '0.00918671551247386',
//     currency: 'USD'
//   },
//   {
//     id: 77,
//     amount: '0.9999997399525015',
//     currency: 'USD'
//   }
// ]
```
