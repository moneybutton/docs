---
id: html
title: HTML
---

How to use in HTML:

```
<!-- place once in your HTML at the top -->
<script src="https://moneybutton.com/moneybutton.js" />
```

```
<!-- place your button(s) anywhere you want in your HTML -->
<div class="money-button"
  data-to=[to]
  data-amount=[amount]
  data-currency=[currency]
/>
```

The MoneyButton div can take a number of params:

| prop                     | type                                      | default value |
| ------------------------ | ----------------------------------------- | ------------- |
| `data-to`                | `string` (either a BCH address or userId) | `null`        |
| `data-amount`            | `string`                                  | `null`        |
| `data-currency`          | `string` (`'USD'`, `'BCH'`, etc.)         | `'USD'`       |
| `data-label`             | `string`                                  | `''`          |
| `data-hide-amount`       | `string` (`'true'` or `'false'`)          | `'false'`     |
| `data-op-return`         | `string`                                  | `null`        |
| `data-outputs`           | `string`                                  | `'[]'`        |
| `data-client-identifier` | `string`                                  | `null`        |
| `data-button-id`         | `string`                                  | `null`        |
| `data-button-data`       | `string`                                  | `null`        |
| `data-type`              | `string` (`'buy', 'tip'`)                 | `'buy'`       |
| `data-onpayment`         | `string`                                  | `null`        |
| `data-onerror`           | `string`                                  | `null`        |
| `data-dev-mode`          | `string` (`'true'` or `'false'`)          | `'false'`     |

`outputs` is a JSON stringified list of `output` objects. Each `output` object has these parameters:

| name       | type                          | required? |
| ---------- | ----------------------------- | --------- |
| `address`  | `string`                      | optional  |
| `userId`   | `string`                      | optional  |
| `script`   | `string`                      | optional  |
| `amount`   | `string`                      | required  |
| `currency` | `string` (`USD`, `BCH`, etc.) | required  |

Also, the `onPayment` and `onError` strings are actually the name of a function in the global namespace. Those functions must look like this:

```
function onPayment (payment) {
    // ...
}

function onError (error) {
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

When `devMode` is enabled the button desn't make any transaction.
