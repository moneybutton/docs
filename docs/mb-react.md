---
id: mb-react
title: React
---

The React version of Money Button is what we use throughout the main Money
Button app and every other app we build. It is very similar to and is based on
the pure javascript version of Money Button.

This page has only introductory information. For more detailed information,
please see the [javascript documentation](./md-javascript.md).

How to install the React component:

```
npm install @moneybutton/react-money-button
```

How to use it in your react project:

```
let MoneyButton = require('@moneybutton/react-money-button').default
```

How to use it to receive a specific amount at a specific address:

```
<MoneyButton
  to=[paymail, user ID, address, or script]
  amount=[amount]
  currency=[currency]
/>
```

The MoneyButton component can take a number of props:

| prop               | type                                            | default value   |
|--------------------|-------------------------------------------------|-----------------|
| `to`               | `string` (paymail, user ID, address, or script) | `null`          |
| `amount`           | `string`                                        | `null`          |
| `currency`         | `string` (`USD`, `BSV`, etc.)                   | `'USD'`         |
| `label`            | `string`                                        | `''`            |
| `successMessage`   | `string`                                        | `'It's yours!'` |
| `opReturn`         | `string`                                        | `null`          |
| `outputs`          | `array`                                         | `[]`            |
| `clientIdentifier` | `string`                                        | `null`          |
| `buttonId`         | `string`                                        | `null`          |
| `buttonData`       | `string`                                        | `null`          |
| `type`             | `string` (`'buy', 'tip'`)                       | `'buy'`         |
| `onPayment`        | `function`                                      | `null`          |
| `onError`          | `function`                                      | `null`          |
| `onLoad`           | `function`                                      | `null`          |
| `editable`         | `boolean`                                       | `false`         |
| `disabled`         | `boolean`                                       | `false`         |
| `devMode`          | `boolean`                                       | `false`         |

`outputs` is a list of `output` objects. Each `output` object has these
parameters:

| name       | type                          | required? |
| ---------- | ----------------------------- | --------- |
| `to`       | `string`                      | optional  |
| `paymail`  | `string`                      | optional  |
| `userId`   | `string`                      | optional  |
| `address`  | `string`                      | optional  |
| `script`   | `string`                      | optional  |
| `amount`   | `string`                      | required  |
| `currency` | `string` (`USD`, `BSV`, etc.) | required  |

`to`, `amount` and `currency` work exactly as the top level attributes with the
same name, except for the detail that all the outputs have to use the same
currency. If there are 2 outputs using different currencies the button will fail
before rendering.

Instead of using `to` argument you can specify which kind of output you are
using with one of the attributes `paymail`, `userId`, `address`, or `script`.

Also, the `onPayment` function must look like this:

```
function myOnPaymentCallback (payment) {
    // ...
}
```

Where the `payment` is an object that looks like this:

| name             | type     |
|------------------|----------|
| `id`             | `string` |
| `buttonId`       | `string` |
| `buttonData`     | `string` |
| `status`         | `string` |
| `txid`           | `string` |
| `normalizedTxid` | `string` |
| `amount`         | `string` |
| `currency`       | `string` |
| `satoshis`       | `string` |
| `outputs`        | `array`  |

Where in this case the outputs are slightly more sophisticated:

| name       | type                                                  |
|------------|-------------------------------------------------------|
| `to`       | `string`                                              |
| `paymail`  | `string`                                              |
| `userId`   | `string`                                              |
| `script`   | `string`                                              |
| `address`  | `string`                                              |
| `amount`   | `string`                                              |
| `currency` | `string`                                              |
| `satoshis` | `number`                                              |

`to` is optional. It can be a paymail, a user ID, an address, or a script.

´onError´ function look like this:

```
function myOnErrorCallback (error) {
    // ...
}
```

It receives an object describing the error.

´onLoad´ function look like this:

```
function myOnLoadCallback () {
    // ...
}
```

It is called when the button has loaded.

When `devMode` is set to true no transactions are made when you swipe the
button. It's just to try the button.

For more information about how the parameters work, please refer to [html
version documentation](mb-html.md)
