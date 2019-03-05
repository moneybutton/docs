---
id: bsv-overview
title: Overview
---

bsv is a library for managing user keys, building and signing bitcoin transactions (including inputs, outputs and scripts), signing generic data, encrypting generic data, or doing anything that a client-side web wallet is likely to need to do.

It is not necessary to use bsv to use Money Button. However, advanced applications will often want to do sophisticated low-level Bitcoin operations that need a library for that purpose.

The most important use of bsv for Money Button apps right now is to [write OP_RETURN data to the blockchain](bsv-op-return.md).

To add bsv to your application, you can either use node.js or web browsers.

In node.js, first install the library using yarn:
```
yarn add bsv
```

Or npm:
```
npm install --save --save-exact bsv
```

And then add to your code:
```
let bsv = require('bsv')
```

In a web browser, we recommend using webpack and React. However, a good way to get going quickly is to use unpkg. Add this to the top of your HTML in the head tag:
```
<script type="text/javascript" src="https://unpkg.com/bsv@0.21.5/bsv.min.js"></script>
```

Please be sure to always specify the exact version of the library. In the above example, we are using v0.21.5. You can always find the latest version number [on npm](https://www.npmjs.com/package/bsv).
