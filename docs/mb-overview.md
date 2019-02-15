---
id: mb-overview
title: Overview
---

Money Button is an API and a UI/UX layer for the Bitcoin SV blockchain. It is
very easy to add a Money Button to websites and apps to accept payments. In a
few lines of code, you can accept tips or display content behind a pay wall.

However, Money Button is far more than that. There is built-in currency
conversion, authentication, smart contracts, support for multiple outputs, and
the ability to write data such as files, receipts or invoices to the blockchain.
Additionally, with our API, design components, and bsv library, one can build
sophisticated full-featured on-chain apps. Our technical mission is to support
every feature of Bitcoin SV in a manner that is as easy to use as possible, both
for developers and end-users.

The easiest way to use Money Button is to click around on the [config
page](https://www.moneybutton.com/config) and copy and paste the HTML into your
website. For users who wish to do sophisticated things, we provide three primary
ways to create a Money Button in a webapp. The first is [HTML](./mb-html.html),
the second is [Javascript](./mb-javascript.html), and the third is
[React](./mb-react.html).

The simplest Money Button in HTML looks like this:

``` html
<script src="https://www.moneybutton.com/moneybutton.js"></script>
<div class="money-button"
  data-to="[address or user ID]"
  data-amount="[amount]"
  data-currency="[currency]"
></div>
```

The HTML version of Money Button is the easiest one to use, but it is somewhat
limited in that it is impossible to dynamically update an HTML Money Button.
Sometimes you want to update a Money Button dynamically, like when the price
changes, or when the users chooses an action in a video game, or when they edit
the text they want to post to the blockchain. Therefore we invented a pure
Javascript version of Money Button that can be updated dynamically.

The simplest Money Button in Javascript looks like this:

``` html
<script src="https://www.moneybutton.com/moneybutton.js"></script>
<div id="my-money-button"></div>
<script>
  const div = document.getElementById('my-money-button')
  moneyButton.render(div, {
    to: "[address or user ID]",
    amount: "[address]",
    currency: "[currency]"
  })
</script>
```

The Javascript Money Button has every feature of Money Button. However, for
developers who use React (like us), it would be awfully convenient to have a
React component that does the same thing as the Javascript version. So we made a
react component. The easiest way to create a React Money Button is like this:

```
let MoneyButton = require('@moneybutton/react-money-button')

class MyComponent {
  return (
    <MoneyButton
      to=[address]
      amount=[amount]
      currency=[currency]
    />
  )
}
```

There is one important difference between the HTML version and the other
versions. HTML doesn't have a notion of types, so everything is a string. But
the Javascript and React versions do have types, so not everything is a string.
For instance, to create an editable Money Button (where the user can change the
amount), you would do this in HTML:

``` html
<script src="https://www.moneybutton.com/moneybutton.js"></script>
<div class="money-button"
  data-to="[address or user ID]"
  data-editable="true"
  data-currency="[currency]"
></div>
```

Notice how the <code>data-editable</code> field is a string. But in the
Javascript version you would do this:

``` html
<script src="https://www.moneybutton.com/moneybutton.js"></script>
<div id="my-money-button"></div>
<script>
  const div = document.getElementById('my-money-button')
  moneyButton.render(div, {
    to: "[address or user ID]",
    editable: true,
    currency: "[currency]"
  })
</script>
```

Notice how the <code>editable</code> property is a boolean. If you understand
that difference, it explains every other difference between the HTML versions
and the other versions.

Thank you for reading this overview. Please explore the rest of the
documentation to learn about all the features of Money Button.
