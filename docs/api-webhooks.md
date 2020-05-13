---
id: api-webhooks
title: Webhooks
---

When one of your users makes a payment, you need to know the status of that payment. The payment goes through several different status in its lifetime. When the status of a payment changes, we ping your webhook URL.

The status of a payment can be one of these things:

| name        | description                                   |
|-------------|-----------------------------------------------|
| `PENDING`   | tx has been built but not yet signed          |
| `RECEIVED`  | tx has been signed, broadcasted, and is valid |
| `COMPLETED` | tx has been confirmed in a block              |
| `FAILED`    | tx has been rejected by the network           |

Your webhook URL must accept a POST request with JSON. The object we send you looks like this:

```
{ secret, payment }
```

The `payment` object looks like this:

| name             | type     | description                                         |
|------------------|----------|-----------------------------------------------------|
| `id`             | `string` | Unique Money Button id of the payment.              |
| `buttonId`       | `string` | The identifier specified in the button used to pay. |
| `buttonData`     | `string` | The data indicated in the button.                   |
| `status`         | `string` | Status of the payment.                              |
| `txid`           | `string` | id of the BSV transaction.                          |
| `normalizedTxid` | `string` | Normalized id of the BSV transaction.               |
| `amount`         | `string` | Total amount paid.                                  |
| `currency`       | `string` | Currency of the button.                             |
| `satoshis`       | `string` | Total amount expressed in Satoshis.                 |
| `outputs`        | `array`  | Output details                                      |
| `userId`         | `string` | The Money Button user ID of the sender.             |
| `rawtx`          | `string` | The fully signed raw BSV transaction in hex format. |

Note that merely receiving a webhook does not necessarily indicate a successful payment. The `payment` object has a `status`, and `status` can be `DOUBLE_SPENT` indicating an earlier payment is no longer valid.

Where the outputs look like this:

| name       | type                                       |
| ---------- | ------------------------------------------ |
| `type`     | `string` (`'address', 'userId', 'script'`) |
| `address`  | `string`                                   |
| `userId`   | `string`                                   |
| `script`   | `string`                                   |
| `amount`   | `string`                                   |
| `currency` | `string`                                   |
| `satoshis` | `number`                                   |
