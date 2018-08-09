---
id: react-money-button
title: React Component
---

How to install the React component:

```
npm install react-money-button
```

How to use it in your react project:

```
let MoneyButton = require('react-money-button')
```

How to use it to receive a specific amount at a specific address:

```
<MoneyButton
  to=[address]
  amount=[amount]
  currency=[currency]
/>
```

The MoneyButton component can take a number of props:

| prop               | type                                      | default value |
| ------------------ | ----------------------------------------- | ------------- |
| `to`               | `string` (either a BCH address or userId) | `null`        |
| `amount`           | `string`                                  | `null`        |
| `currency`         | `string` (`USD`, `BCH`, etc.)             | `'USD'`       |
| `label`            | `string`                                  | `''`          |
| `hideAmount`       | `boolean`                                 | `false`       |
| `opReturnData`     | `string`                                  | `null`        |
| `outputs`          | `array`                                   | `[]`          |
| `clientIdentifier` | `string`                                  | `null`        |
| `buttonId`         | `string`                                  | `null`        |
| `buttonData`       | `string`                                  | `null`        |
| `type`             | `string` (`'pay', 'tip'`)                 | `'pay'`       |
| `onPayment`        | `function`                                | `null`        |
| `onError`          | `function`                                | `null`        |
| `devMode`          | `boolean`                                 | `false`       |

`outputs` is a list of `output` objects. Each `output` object has these parameters:

| name       | type                          | required? |
| ---------- | ----------------------------- | --------- |
| `address`  | `string` (`'pay', 'tip'`)     | optional  |
| `userId`   | `string`                      | optional  |
| `script`   | `string`                      | optional  |
| `amount`   | `string`                      | required  |
| `currency` | `string` (`USD`, `BCH`, etc.) | required  |

Also, the `onPayment` function must look like this:

```
function myOnPaymentCallback (payment) {
    // ...
}
```

Where the `payment` is an object that looks like this:

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

Where in this case the outputs are slightly more sophisticated:

| name       | type                                       |
| ---------- | ------------------------------------------ |
| `type`     | `string` (`'address', 'userId', 'script'`) |
| `address`  | `string`                                   |
| `userId`   | `string`                                   |
| `script`   | `string`                                   |
| `amount`   | `string`                                   |
| `currency` | `string`                                   |
| `satoshis` | `number`                                   |

´onError´ function look like this:

```
function myOnErrorCallback (error) {
    // ...
}
```

It receives an object describing the error.

When `devMode` is set to true no transactions are made when you swipe the button. It's just to try
the button.
