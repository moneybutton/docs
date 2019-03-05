---
id: api-oauth
title: OAuth
---

Early on, we knew it would be important to have an authentication system so that users can "sign in with Money Button" in third party apps. The top reason for this is so that the user can make a purchase with Money Button on a website, and then come back some time later, and the website can remember what they purchased. There are many other reasons to have an auth system, such as user-to-user payment inside of an app. For instance, every feature of [Yours.org](https://www.yours.org) works with Money Button.

OAuth is a standard way to create authentication systems and is used by major tech companies like Google and Facebook. The basic idea is that a user presses a button to "sign in with Money Button" and is then directed to a popup if the user would like to share permissions with the app. The app can ask for multiple permissions, and if the user agrees, those permissions are granted to the app. The permissions include the user's ID at a minimum, and may include other permissions such as a list of their UTXOs. If the user doesn't want to grant permissions, they simply click "no".

Assuming the user clicks "yes", they are redirected back to the app at the "OAuth redirect URL".

Therefore, the flow is as follows:

1. The app wishes to have the user sign in with some permissions.
2. The user presses a button which opens a popup hosted at moneybutton.com that asks if the user agrees to sign in and grant these permissions to the app.
3. If the user agrees, they are redirected back to the app at the redirect URL.
4. The app now has a token which they can store anywhere (client-side or server-side) to access the permissions that has been granted by the user (such as viewing the user ID).

Sign In Button
--------------

First, you need to have an [app](api-apps.md). Your app will have two properties that you will need:
* CLIENT_IDENTIFIER
* OAUTH_IDENTIFIER

Now, make an instance of the Money Button [api-client](api-client.html).

Import it into your app like so:
``` javascript
let MoneyButtonClient = require('@moneybutton/client')
```

Now create a new client by passing in your client identifier:
``` javascript
moneyButtonClient = new MoneyButtonClient(CLIENT_IDENTIFIER)
```

This api-client is in the web browser. Now you can request authorization to read the user's ID:

``` javascript
moneyButtonClient.requestAuthorization(
  'auth.user_identity:read',
  OAUTH_REDIRECT_URI
)
```

This will open a popup that will have the user sign in and you will get read permissions on their user ID.

Get Token
---------

It's important that your app has set the redirect URL in the app settings. After the user signs in, they will be redirected to the redirect URL, and that URL will contain a token.

On your redirect page, you can have logic like this to get the token:
``` javascript
  await moneyButtonClient.handleAuthorizationResponse()
  const { id: moneyButtonId } = await moneyButtonClient.getIdentity()
```

The access token has automatically been handled by api-client and is stored in localStorage. You can now use api-client to query for information that the user has granted you access to.

OAuth Example: Markdown Paywall
-------------------------------

We built an app called Markdown Paywall to demonstrate the auth system and other
major features of Money Button. See [Markdown
Paywall](https://github.com/moneybutton/markdown-paywall) on GitHub. This app
allows users to sign in, post content, and view content. The content can have a
pay wall. When a user buys content, they can log in again on another device and
the content they purchased is still accessible.
