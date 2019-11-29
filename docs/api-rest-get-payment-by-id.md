---
id: api-rest-get-payment-by-id
title: Get Payment By ID
---

Returns a collection of payments belonging to the current user or app.

## Facts.

| Attribute      | Value                                                    |
|----------------|----------------------------------------------------------|
| url            | `https://www.moneybutton.com/api/v1/payments/{paymentId}` |
| http verb      | `GET`                                                    |
| Required scope | `payments:read` or `application_access:write`            |

## Attributes

### URL

* paymentId: The id of the required payment. This is not a txid, it's a Money Button id for the payment object.

## Response

``` json
{
  "included": [
    {
      "type": "payment-outputs",
      "id": "80",
      "attributes": {
        "created-at": "2019-08-21T21:35:14.233Z",
        "to": "5",
        "amount": "1",
        "currency": "USD",
        "satoshis": "746676",
        "type": "USER",
        "user-id": "5",
        "address": null,
        "script": null,
        "amount-usd": "1",
        "user-paymail": "johndoe@example.com"
      }
    }
  ],
  "data": {
    "type": "payments",
    "id": "75",
    "attributes": {
      "created-at": "2019-08-21T21:35:14.229Z",
      "user-id": "7",
      "txid": "79cdd6f7649e9ca0a63e065cde3f4f5fdd6f3012eccfbea1f0e031b91a46cf54",
      "normalized-txid": "b27a07a739bc633f73ae47b9956269d342a42491b60f0ee326c65dec869855c9",
      "amount": "0.9999997399525015",
      "currency": "USD",
      "satoshis": "746676",
      "status": "COMPLETED",
      "status-description": null,
      "button-id": "1566423247979",
      "button-data": "{\"productId\":\"ac754t6\"}",
      "amount-usd": "0.9999997399525015",
      "input-amount-usd": "123.91680720810011",
      "input-amount-satoshis": "92525730",
      "spend-amount-usd": "1.0005073227614334",
      "spend-amount-satoshis": "747055",
      "fee-amount-usd": "0.00050758280893185",
      "fee-amount-satoshis": "379",
      "change-amount-usd": "122.91629988533867",
      "change-amount-satoshis": "91778675"
    },
    "relationships": {
      "payment-outputs": {
        "data": [
          {
            "type": "payment-outputs",
            "id": "80"
          }
        ]
      }
    }
  }
}
```

## Using our js api client

``` js
const mbClient = new MoneyButtonClient(CLIENT_IDENTIFIER, CLIENT_SECRET)
await mbClient.logInAsApp()
const payments = await mbClient.getPaymentById(75)
console.log('The txid is: ', payments.txid)
// Output:
// The txid is: 79cdd6f7649e9ca0a63e065cde3f4f5fdd6f3012eccfbea1f0e031b91a46cf54
```
