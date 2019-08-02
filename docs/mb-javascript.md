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
| `opReturn`         | `string`                                  | `null`          |
| `outputs`          | `array`                                   | `[]`            |
| `clientIdentifier` | `string`                                  | `null`          |
| `buttonId`         | `string`                                  | `null`          |
| `buttonData`       | `string`                                  | `null`          |
| `type`             | `string` (`'buy', 'tip'`)                 | `'buy'`         |
| `onPayment`        | `function`                                | `null`          |
| `onError`          | `function`                                | `null`          |
| `onLoad`           | `function`                                | `null`          |
| `editable`         | `boolean`                                 | `false`         |
| `disabled`         | `boolean`                                 | `false`         |
| `devMode`          | `boolean`                                 | `false`         |

All the options are matched with the attributes of the HTML API, and have the
exact same behavior. The HTML version uses the Javascript version under the
hood.

### to

This attribute specifies who is going to receive the payment. It's a string, and
depending on its format it is interpreted in different ways:

* Natural number: If the value matches with a natural number ( `/^\d+$/` ) then
  it is interpreted as a user ID, so the receiver is a Money Button user with
  that exact user ID.
* BSV Address: In this case the recipient of the transaction is going to be that
  address. The address does not need to belong to a Money Button user.
* Script: When the value can be interpreted as a valid BSV script using ASM
  format, then we use that script as an output script.
* If the this attribute doesn't match with any of the previous forms, the button
  fails.

This argument works together with `data-amount` and `data-currency`. If one of
them is present the other two have to be present too.

If this attribute is present then `data-outputs` attributes cannot be present.

### amount and currency

`amount` is a decimal number expressed as a string.

`currency` is the ISO code of the currency for fiat, or the ticker symbol
for cryptocurrencies. It's always a three letter code. Popular currencies
include 'USD', 'ARS', 'GBP', and many others. For a full list, see
[currencies](./api-currencies.md).

These two combined specify the amount of money to be transferred when the button
is swiped. The amount is converted into BSV at the moment of the swipe.

Both of them work together with `to`. If any of the three is present, the
other two have to be present too.

### label

Is the label of the button.

![lala](assets/labelexample.png)

### successMessage

After a successful payment the button shows a success animation with a success
message. This attribute allows you to specify a custom success message.

When this value is not present the button has different defaults regarding its
type. Tip buttons shows `Thank you!`, and buy buttons show `It's yours!`.

### opReturn

If this attribute is present an extra output is added to the transaction with a
simple `OP_RETURN` script to post data on the BSV blockchain. The string is
encoded in UTF-8 and used directly in the script. The size limit is 99000 bytes
as determined by the BSV protocol. If you want to put large amounts of data in
an `OP_RETURN` output, please [follow these instructions](./ex-op-return.md).

### outputs

This attribute is used to specify a lists of outputs on the BSV transaction.
This is what you want to use if you want to send to multiple different people at
the same time, or "multiple recipients." It can't be used at the same time with
`to`, `amount` or `currency`.

`outputs` is an array containing a lists of output objects. Each
`element` may have the following properties:

| name       | type                          | required? |
| ---------- | ----------------------------- | --------- |
| `to`       | `string`                      | optional  |
| `address`  | `string`                      | optional  |
| `userId`   | `string`                      | optional  |
| `script`   | `string`                      | optional  |
| `amount`   | `string`                      | required  |
| `currency` | `string` (`USD`, `BSV`, etc.) | required  |

`to`, `amount` and `currency` work exactly as the top level attributes with the
same name, except for the detail that all the outputs have to use the same
currency. If there are 2 outputs using different currencies the button will fail
before rendering.

Instead of using `to` argument you can specify which kind of output you are
using with one of the attributes `address`, `userId`, or `script`.

An example of a button that pays to two addresses looks like this:

```javascript
moneyButton.render(div, {
  outputs=[
    {
      address: "16gsUKFNLSqVVg6ax5TXmvx1GWjffxMGV6",
      amount: "0.085",
      currency: "USD"
    },
    {
      address: "1KWzpdQAwd4kDEaLu5cWJ54yJ8WCgAGizQ",
      amount: "0.015",
      currency: "USD"
    }
  ]
})
```

An example of a button that pays to two users looks like this:

```javascript
moneyButton.render(div, {
  outputs=[
    {
      userId: "6",
      amount: "0.085",
      currency: "USD"
    },
    {
      userId: "1040",
      amount: "0.015",
      currency: "USD"
    }
  ]
})
```

### clientIdentifier

Each app that uses Money Button is called a "client" in the jargon of OAuth.
Money Button supports multiple clients per account. This is useful when a user
wants to use Money Button to build several apps. When a transaction is done on a
specific client the owner of the client can see the transaction even if they are
not a recipient or sender of the funds.

More documentation about clients and OAuth will be available soon.

### buttonId

This attribute is an identifier of the payment of the button. It can be used as
an invoice number or reference number. It can be any string and it's attached to
the payments created with a specific button. Payments are stored with that
string and then can be queried later using this attribute.

More documentation about Payments API will be available soon.

### buttonData

This attribute can be any string, but is meant to be a valid JSON string. The
user can set arbitrary data here, that is associated with the payment and sent
on the webhooks and retrieved with the API.

### onPayment

A function that is called when the user makes a successful payment.

Example:

``` javascript
function myCustomCallback (payment) {
  console.log('A payment has occurred!', payment)
}

moneyButton.render(div, {
  to: "16gsUKFNLSqVVg6ax5TXmvx1GWjffxMGV6",
  amount: "0.085",
  currency: "USD",
  onPayment: myCustomCallback
})
```

The payment attribute is a javascript object with the following attributes:

| name             | type     | description                                                          |
|------------------|----------|----------------------------------------------------------------------|
| `id`             | `string` | Unique Money Button id of the payment.                               |
| `buttonId`       | `string` | The identifier specified in the button used to pay.                  |
| `buttonData`     | `string` | The data indicated in the button.                                    |
| `status`         | `string` | Status of the payment. More information on `webhooks` documentation. |
| `txid`           | `string` | id of the BSV transaction.                                           |
| `normalizedTxid` | `string` | Normalized id of the BSV transaction.                                |
| `amount`         | `string` | Total amount paid.                                                   |
| `currency`       | `string` | Currency of the button.                                              |
| `satoshis`       | `string` | Total amount expressed in Satoshis.                                  |
| `outputs`        | `array`  | Output details                                                       |

The function is always called in the context of 'window' object.

You can make a simple pay wall using the onPayment callback. An example is as
follows:

```html
<div id="my-button"></div>
<div id="my-hidden-content"></div>

<script>
  function displayHiddenContent (payment) {
    // be sure to validate the transaction - does it have the right outputs?
    document.getElementById('my-hidden-content').innerHTML = 'Hidden content.'
  }

  moneyButton.render(document.getElementById('my-button'), {
    to: "1040",
    amount: "0.01",
    currency: "USD",
    onPayment: displayHiddenContent
  })
</script>
```

Note that this simple example is not very secure. If you want to make a secure
pay wall, you should use the [api-client](./api-client.md) and/or
[webhooks](./api-webhooks.md).

### onError

A function that is called when an error occurs during the payment. Is not called
if there is a problem with the parameters of the button or if there is a problem
related with compatibility.

``` html
<div id="my-button"></div>

<script>
  function myCustomCallback (error) {
    console.log(`An error has occurred: ${error}`)
  }

  moneyButton.render(document.getElementById('my-button'), {
    to: "1040",
    amount: "0.01",
    currency: "USD",
    onError: myCustomCallback
  })
</script>
```

The parameter received by the function is the description of the error.
The function is always called in the context of `window` object.

### onLoad

A function that is called when the button has finished loading.

``` html
<div id="my-button"></div>

<script>
  function myCustomCallback () {
    console.log(`The button has loaded.`)
  }

  moneyButton.render(document.getElementById('my-button'), {
    to: "1040",
    amount: "0.01",
    currency: "USD",
    onLoad: myCustomCallback
  })
</script>
```

### editable

When this attribute is true the button is displayed in an editable mode,
allowing the user to set the amount of the transaction before pay. When this
attribute is set to `true` the values of `to`, `amount`, `currency` and
`outputs` are ignored. Editable buttons are able to have `OP_RETURN` using the
attribute `data-op-return`.

### disabled

When this attribute is `true` the button is displayed in a disabled mode where it
cannot be swiped.

### devMode

This attribute is `false` by default. If it is set to `true` the button becomes
a dummy component. It doesn't execute any callback and doesn't interact with the
backend at all. Instead it always succeeds.
