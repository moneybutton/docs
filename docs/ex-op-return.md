---
id: ex-op-return
title: OP_RETURN Scripts
---

The most common way to use bsv with a Money Button app is to write sophisticated scripts, particularly OP_RETURN scripts.

First, a bit of background. Transactions in Bitcoin SV have inputs and outputs. Each input comes from an earlier output. Each input and output has a script inside. For a transaction to be valid, each input must be valid. For an input to be valid, the script of the input must evaluate true, and then, keeping the stack the same, the script from the previous output must also evaluate true.

Scripts are written in binary inside a Bitcoin transaction using a custom format. There is a standard way to write scripts in string format called "ASM". The ASM format is supported by bsv.

An example of an OP_RETURN script written in ASM format is this:
```sh
OP_FALSE OP_RETURN 6d6f6e6579627574746f6e2e636f6d
```

You can see it starts with the OP_FALSE and OP_RETURN opcodes.

The value "6d6f6e6579627574746f6e2e636f6d" is actually the string "moneybutton.com" encoded in hex format.

To convert a string to a utf8-encoded hex string in node.js, use this:
```javascript
Buffer.from('moneybutton.com').toString('hex')
```

A more sophisticiated OP_RETURN script looks like this:
```sh
OP_FALSE OP_RETURN 6d6f6e6579627574746f6e2e636f6d 75746638 68656c6c6f2e20686f772061726520796f753f
```

This script pushes three different values. The values are as follows:

| hex                                    | string              |
|----------------------------------------|---------------------|
| 6d6f6e6579627574746f6e2e636f6d         | moneybutton.com     |
| 75746638                               | utf8                |
| 68656c6c6f2e20686f772061726520796f753f | hello. how are you? |

bsv has a convenience method for writing scripts like this. use the bsv.Script.buildSafeDataOut. It works like this:

```javascript
bsv.Script.buildSafeDataOut(['moneybutton.com', 'utf8', 'hello. how are you?']).toASM()
```

That code will return this string value:
```javascript
'OP_FALSE OP_RETURN 6d6f6e6579627574746f6e2e636f6d 75746638 68656c6c6f2e20686f772061726520796f753f'
```

You can insert this value into a Money Button output as follows. If you are using the HTML Money Button, it looks like this:
```html
<div class='money-button'
  data-outputs='[{
    "script": "OP_FALSE OP_RETURN 6d6f6e6579627574746f6e2e636f6d 75746638 68656c6c6f2e20686f772061726520796f753f",
    "amount": "0",
    "currency": "BSV"
  }]'
></div>
```

If you are using the Javascript Money Button, it looks like this:
```html
<div id='my-money-button'></div>
<script language='javascript'>
  const div = document.getElementById('my-money-button')
  moneyButton.render(div, {
    outputs: [{
      script: 'OP_FALSE OP_RETURN 6d6f6e6579627574746f6e2e636f6d 75746638 68656c6c6f2e20686f772061726520796f753f',
      amount: '0',
      currency: 'BSV'
    }]
  })
</script>
```

The most popular way to insert file data into the blockchain is to use [B](https://github.com/unwriter/B). However, data can be structure in any way and it is up to writers (wallets) and readers (block explorers or browsers) to decide what works best for their application.
