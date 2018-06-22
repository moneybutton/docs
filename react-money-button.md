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

* **to** can be an address or userId
* **amount** is a number
* **currency** is 'USD', 'BCH', etc.

How to pass in a long list of outputDescriptions:

```
<MoneyButton outputDescriptions=[outputDescriptions] />
```

* **outputDescriptions** is an array of objects. Those objects specify to, amount, currency, like this:

```
let outputDescription = {to, amount, currency}
```

How to use the onPayment callback:

```
<MoneyButton onPayment=[onPayment] />
```

How to specify the color:

```
<MoneyButton color=[color] />
```

* **color** can be 'red', 'blue', 'light', 'dark'

How to specify the size:

```
<MoneyButton size=[size] />
```

* **size** can be 'small', 'medium', 'large'

How to specify the type:

```
<MoneyButton type=[type] />
```

* **type** can be 'tip', 'pay', 'buy', 'vote'

Whether to display amount:

```
<MoneyButton displayAmount=[displayAmount] />
```

* **displayAmount** is a boolean that can be either true or false.
