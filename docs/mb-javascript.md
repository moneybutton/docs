---
id: mb-javascript
title: Javascript
---

## The `moneyButton` object

Our script also defines a global object called `moneyButton`. Right now
it provides only one function `render`.

### render

``` html
<div id='some-div'></div>
<script>
  const div = document.getElementById('some-div')
  moneyButton.render(div, {
    amount: "1",
    to: "12cRRk9wn2LofWKE2wwxb7mw5qNeMaW7zH",
    currency: "USD",
    label: "Wait...",
    clientIdentifier: "some public client identifier",
    buttonId: "234325",
    buttonData: "{}",
    type: "tip",
    onPayment: function (arg) { console.log('onPayment', arg) },
    onError: function (arg) { console.log('onError', arg) }
  })
</script>
```

`moneyButton.render` takes two parameters. The first one is an DOM node. The button
is going to be placed inside that DOM node. The second one is an object with options.

The available options are:


| prop                | type                                      | default value  |
| ------------------- | ----------------------------------------- | -------------- |
| `to`                | `string` (either a BSV address or userId) | `null`         |
| `amount`            | `string`                                  | `null`         |
| `currency`          | `string` (`'USD'`, `'BSV'`, etc.)         | `'USD'`        |
| `label`             | `string`                                  | `''`           |
| `opReturn`          | `string`                                  | `null`         |
| `outputs`           | `array`                                   | `[]`           |
| `clientIdentifier ` | `string`                                  | `null`         |
| `buttonId`          | `string`                                  | `null`         |
| `buttonData`        | `string`                                  | `null`         |
| `type`              | `string` (`'buy', 'tip'`)                 | `'buy'`        |
| `onPayment`         | `function`                                | `null`         |
| `onError`           | `function`                                | `null`         |
| `devMode`           | `string` (`'true'` or `'false'`)          | `'false'`      |


All the options are matched with the attributes of the HTML API, and have the exact
same behavior.

The callbacks are only called on events related to payments, and they are always
executed in the context of the `window` object.
