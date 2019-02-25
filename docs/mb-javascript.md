---
id: mb-javascript
title: Javascript
---

The Javascript version of Money Button is very similar to the HTML version, but
with a few key differences. First, values can be typed instead of necessarily
being strings. For instance, some properties are boolean, some are objects, and
some are functions. Second, properties are camelCased instead of being prefixed
with 'data-'. Third, the button can be updated dynamically by rendering it
again.

(The Javascript version of the button is actually what the HTML version is using
under the hood.)

To use the Javascript Money Button, first add this script somewhere inside your
HTML:

``` html
<script src="https://www.moneybutton.com/moneybutton.js"></script>
```

## The `moneyButton` object

The script defines a global object called `moneyButton`. It provides only one
function: `render`.

### render

``` html
<div id='my-money-button'></div>
<script>
  const div = document.getElementById('my-money-button')
  moneyButton.render(div, {
    to: "12cRRk9wn2LofWKE2wwxb7mw5qNeMaW7zH",
    amount: "1",
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

`moneyButton.render` takes two parameters. The first one is an DOM node. The
button is going to be placed inside that DOM node. The second one is an object
with options.

The available options are:

| option             | type                                      | default value   |
| ------------------ | ----------------------------------------- | --------------- |
| `to`               | `string` (either a BSV address or userId) | `null`          |
| `amount`           | `string`                                  | `null`          |
| `currency`         | `string` (`USD`, `BSV`, etc.)             | `'USD'`         |
| `label`            | `string`                                  | `''`            |
| `successMessage`   | `string`                                  | `'It's yours!'` |
| `hideAmount`       | `boolean`                                 | `false`         |
| `opReturn`         | `string`                                  | `null`          |
| `outputs`          | `array`                                   | `[]`            |
| `clientIdentifier` | `string`                                  | `null`          |
| `buttonId`         | `string`                                  | `null`          |
| `buttonData`       | `string`                                  | `null`          |
| `type`             | `string` (`'buy', 'tip'`)                 | `'buy'`         |
| `onPayment`        | `function`                                | `null`          |
| `onError`          | `function`                                | `null`          |
| `editable`         | `boolean`                                 | `false`         |
| `disabled`         | `boolean`                                 | `false`         |
| `devMode`          | `boolean`                                 | `false`         |

All the options are matched with the attributes of the HTML API, and have the
exact same behavior.

The callbacks are only called on events related to payments, and they are always
executed in the context of the `window` object.

`outputs` is a list of `output` objects. Each `output` object has these
parameters:

| name       | type                          | required? |
| ---------- | ----------------------------- | --------- |
| `address`  | `string`                      | optional  |
| `userId`   | `string`                      | optional  |
| `script`   | `string`                      | optional  |
| `amount`   | `string`                      | required  |
| `currency` | `string` (`USD`, `BSV`, etc.) | required  |

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
| `to`       | `string`                                   |
| `type`     | `string` (`'address', 'userId', 'script'`) |
| `address`  | `string`                                   |
| `userId`   | `string`                                   |
| `script`   | `string`                                   |
| `amount`   | `string`                                   |
| `currency` | `string`                                   |
| `satoshis` | `number`                                   |

`to` is optional. It can be a BSV address, a user id or a script.
if `to` is present then `type`, `address`, `userId` and `currency`
should not be present.

´onError´ function look like this:

```
function myOnErrorCallback (error) {
    // ...
}
```

It receives an object describing the error.

When `devMode` is set to true no transactions are made when you swipe the
button. It's just to try the button.
