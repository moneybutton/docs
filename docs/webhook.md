---
id: webhook
title: Webhook
---

When one of your users makes a payment, you need to know the status of that payment. The payment goes through several different status in its lifetime. When the status of a payment changes, we ping your webhook URL.

The status of a payment can be one of these things:

| name           | description                                                                       |
| -------------- | --------------------------------------------------------------------------------- |
| `PENDING`      | tx has been built but not yet signed                                              |
| `BROADCASTED`  | tx has been signed and broadcasted                                                |
| `UNCONFIRMED`  | tx has been received via the network but has not yet confirmed                    |
| `CONFIRMED`    | tx has been confirmed at least once                                               |
| `COMPLETED`    | tx has been confirmed at least six times                                          |
| `MALLEATED`    | tx has been malleated, but outputs are still the same, so you still got the money |
| `DOUBLE_SPENT` | tx has been double spent - you may not get your money                             |

Your webhook URL must accept a POST request with JSON. The object we send you looks like this:

```
{ secret, payment }
```

The `payment` object looks like this:

| name         | type     |
| ------------ | -------- |
| `id`         | `string` |
| `buttonId`   | `string` |
| `buttonData` | `string` |
| `status`     | `string` |
| `txid`       | `string` |
| `ntxid`      | `string` |
| `amount`     | `string` |
| `currency`   | `string` |
| `satoshis`   | `string` |
| `outputs`    | `array`  |

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
