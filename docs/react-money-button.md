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
<MoneyButton to=[address] amount=[amount] currency=[currency] />
```

The MoneyButton component can take a number of props:

| prop           | type                                      | default value |
| -------------- | ----------------------------------------- | ------------- |
| `type`         | `string` (`'pay', 'tip'`)                 | `'pay'`       |
| `to`           | `string` (either a BCH address or userId) | Yours Inc.    |
| `amount`       | `string`                                  | `null`        |
| `currency`     | `string` (`USD`, `BCH`, etc.)             | `'USD'`       |
| `opReturnData` | `string`                                  | `null`        |
| `outputs`      | `array`                                   | `[]`          |
| `ownerId`      | `string`                                  | `null`        |
| `buttonId`     | `string`                                  | `null`        |
| `buttonData`   | `string`                                  | nu`l`l        |
| `size`         | `string`                                  | `'med'`       |
| `color`        | `string`                                  | `'light'`     |
| `callback`     | `function`                                | `null`        |

`outputs` is a list of `output` objects. Each `output` object has these parameters:

| name       | type                          | required? |
| ---------- | ----------------------------- | --------- |
| `address`  | `string` (`'pay', 'tip'`)     | optional  |
| `userId`   | `string`                      | optional  |
| `script`   | `string`                      | optional  |
| `amount`   | `string`                      | required  |
| `currency` | `string` (`USD`, `BCH`, etc.) | required  |

Also, the `callback` function must look like this:

```
function myCallback (err, payment) {
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
