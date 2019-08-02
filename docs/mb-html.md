---
id: mb-html
title: HTML
---

The easiest way to add a Money Button to a website is with the HTML Money
Button. First, add this script to your HTML somewhere:

``` html
<script src="https://www.moneybutton.com/moneybutton.js"></script>
```

This script allows the user to create Money Button components in two different
ways:

* Using HTML tags with specific attributes that work as place holders for the
  button. That is what this document is about.
* Using the global `moneyButton` object to define Money Button components
  dynamically with javascript. To learn more about that, see the
  [Javascript](./mb-javascript.md) document.

## Defining buttons with HTML

When the document finishes loading, our script looks around the document for
`<div>` elements with the `money-button` class and certain attributes. Every
`<div>` that matches the search is transformed into a Money Button component.

``` html
<!-- place your button(s) anywhere you want in your HTML -->
<div class="money-button"
  data-to=[to]
  data-amount=[amount]
  data-currency=[currency]
></div>
```

A Money Button `<div>` can take the following attributes:

| prop                     | type                                                           | default value |
| ------------------------ | -------------------------------------------------------------- | ------------- |
| `data-to`                | `string` (either a BSV address, a user ID or a BSV script)     | `null`        |
| `data-amount`            | `string`                                                       | `null`        |
| `data-currency`          | `string` (`'USD'`, `'BSV'`, etc.)                              | `'USD'`       |
| `data-label`             | `string`                                                       | `''`          |
| `data-success-message`   | `string`                                                       | `It's yours!` |
| `data-op-return`         | `string`                                                       | `null`        |
| `data-outputs`           | `string`                                                       | `'[]'`        |
| `data-client-identifier` | `string`                                                       | `null`        |
| `data-button-id`         | `string`                                                       | `null`        |
| `data-button-data`       | `string`                                                       | `null`        |
| `data-type`              | `string` (`'buy', 'tip'`)                                      | `'buy'`       |
| `data-on-payment`        | `string`                                                       | `null`        |
| `data-on-error`          | `string`                                                       | `null`        |
| `data-on-load`           | `string`                                                       | `null`        |
| `data-editable`          | `string` (`'true'` or `'false'`)                               | `'false'`     |
| `data-disabled`          | `string` (`'true'` or `'false'`)                               | `'false'`     |
| `data-dev-mode`          | `string` (`'true'` or `'false'`)                               | `'false'`     |

### data-to

This attribute specifies who is going to receive the payment. It's a string, and depending on
its format it is interpreted in different ways:

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

### data-amount and data-currency

`data-amount` is a decimal number expressed as a string.

`data-currency` is the ISO code of the currency for fiat, or the ticker symbol
for cryptocurrencies. It's always a three letter code. Popular currencies
include 'USD', 'ARS', 'GBP', and many others. For a full list, see
[currencies](./api-currencies.md).

These two combined specify the amount of money to be transferred when the button
is swiped. The amount is converted into BSV at the moment of the swipe.

Both of them work together with `data-to`. If any of the three is present, the
other two have to be present too.

### data-label

Is the label of the button.

![lala](assets/labelexample.png)

### data-success-message

After a successful payment the button shows a success animation with a success
message. This attribute allows you to specify a custom success message.

When this value is not present the button has different defaults regarding its
type. Tip buttons shows `Thank you!`, and buy buttons show `It's yours!`.

### data-op-return

If this attribute is present an extra output is added to the transaction with a
simple `OP_RETURN` script to post data on the BSV blockchain. The string is
encoded in UTF-8 and used directly in the script. The size limit is 99000 bytes
as determined by the BSV protocol. If you want to put large amounts of data in
an `OP_RETURN` output, please [follow these instructions](./ex-op-return.md).

### data-outputs

This attribute is used to specify a lists of outputs on the BSV transaction.
This is what you want to use if you want to send to multiple different people at
the same time, or "multiple recipients." It can't be used at the same time with
`data-to`, `data-amount` or `data-currency`.

`outputs` is a stringified JSON array containing a lists of output objects. Each
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

```html
<div class='money-button'
  data-outputs='[
    {
      "address": "16gsUKFNLSqVVg6ax5TXmvx1GWjffxMGV6",
      "amount": "0.085",
      "currency": "USD"
    },
    {
      "address": "1KWzpdQAwd4kDEaLu5cWJ54yJ8WCgAGizQ",
      "amount": "0.015",
      "currency": "USD"
    }
  ]'
></div>
```

An example of a button that pays to two users looks like this:

```html
<div class='money-button'
  data-outputs='[
    {
      "userId": "6",
      "amount": "0.085",
      "currency": "USD"
    },
    {
      "userId": "1040",
      "amount": "0.015",
      "currency": "USD"
    }
  ]'
></div>
```

### data-client-identifier

Each app that uses Money Button is called a "client" in the jargon of OAuth.
Money Button supports multiple clients per account. This is useful when a user
wants to use Money Button to build several apps. When a transaction is done on a
specific client the owner of the client can see the transaction even if they are
not a recipient or sender of the funds.

More documentation about clients and OAuth will be available soon.

### data-button-id

This attribute is an identifier of the payment of the button. It can be used as
an invoice number or reference number. It can be any string and it's attached to
the payments created with a specific button. Payments are stored with that
string and then can be queried later using this attribute.

More documentation about Payments API will be available soon.

### data-button-data

This attribute can be any string, but is meant to be a valid JSON string. The
user can set arbitrary data here, that is associated with the payment and sent
on the webhooks and retrieved with the API.

### data-on-payment

It's the name of a function defined in the global scope. The function is called
when the user makes a successful payment.

``` html
<script>
  function myCustomCallback (payment) {
    console.log('A payment has occurred!', payment)
  }
</script>

<div class="money-button"
  data-to="[to]"
  data-amount="[amount]"
  data-currency="[currency]"
  data-on-payment="myCustomCallback"
></div>
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
<script>
  function displayHiddenContent (payment) {
    // be sure to validate the transaction - does it have the right outputs?
    document.getElementById('my-hidden-content').innerHTML = 'Hidden content.'
  }
</script>

<div class="money-button"
  data-to="1040"
  data-amount="0.01"
  data-currency="USD"
  data-on-payment="displayHiddenContent"
></div>

<div id="my-hidden-content"></div>
```

Note that this simple example is not very secure. If you want to make a secure
pay wall, you should use the [api-client](./api-client.md) and/or
[webhooks](./api-webhooks.md).

### data-on-error

It's the name of a function defined in the global scope. The function is called
when an error occurs during the payment. Is not called if there is a problem
with the parameters of the button or if there is a problem related with
compatibility.

``` html
<script>
  function myCustomCallback (error) {
    console.log(`Oh no! Something went wrong: ${error}`)
  }
</script>

<div class="money-button"
  data-to="[to]"
  data-amount="[amount]"
  data-currency="[currency]"
  data-on-error="myCustomCallback"
></div>
```

The parameter received by the function is the description of the error.
The function is always called in the context of `window` object.

### data-on-load

It's the name of a function defined in the global scope. The function is called
when the button has loaded.

``` html
<script>
  function myCustomCallback (error) {
    console.log(`The button has loaded.`)
  }
</script>

<div class="money-button"
  data-to="[to]"
  data-amount="[amount]"
  data-currency="[currency]"
  data-on-load="myCustomCallback"
></div>
```

The function is always called in the context of `window` object.

### data-editable

When this attribute is true the button is displayed in an editable mode,
allowing the user to set the amount of the transaction before pay. When this
attribute is set to `true` the values of `data-to`, `data-amount`,
`data-currency` and `data-outputs` are ignored. Editable buttons are able to
have `OP_RETURN` using the attribute `data-op-return`.

### data-disabled

When this attribute is true the button is displayed in a disabled mode where it
cannot be swiped.

### data-dev-mode

This attribute is `false` by default. If it is set to `true` the button becomes
a dummy component. It doesn't execute any callback and doesn't interact with the
backend at all. Instead it always succeeds.
