---
id: api-oauth-jsclient
title: OAuth With JS Client
---

We provide a javascript library to deal with our API. The concept of authentication is already built in there and
it contains a full interface to our entire API.

## The Client Object

An instance of `MoneyButtonClient` is always interacting with the API in the context of an OAuth client, that's
why is always instanciated with a client identifier and an optional client secret.

If you want to create a client to interact with data related to your app you can instanciate it using
your client identifier and secret:

``` javascript
const { MoneyButtonClient } = require('@moneybutton/api-client')
const client = new MoneyButtonClient(YOUR_CLIENT_IDENTIFIER, YOUR_CLIENT_SECRET)
```

Or, you can create a client to interact with the grant flow. That is using the public part of your app (`OAuth identifier`)

``` javascript
const { MoneyButtonClient } = require('@moneybutton/api-client')
const client = new MoneyButtonClient(YOUR_OAUTH_IDENTIFIER)
```

## Grant Flow

The client has methods to interact with every part of the permission grant flow.

### User Consent

First, you need to send the user to the concent page:

``` javascript
const { MoneyButtonClient } = require('@moneybutton/api-client')
const client = new MoneyButtonClient(YOUR_OAUTH_IDENTIFIER)
client.requestAuthorization(
  'auth.user_identity:read',
  OAUTH_REDIRECT_URI
)
```

### Get Refresh Token

The user will be redirected to the redirect URL. If you are working client side
the client has a shorthand method to hande the response:

``` javascript
client.handleAuthorizationResponse()
```

That method automatically gets the tokens from the query parameters and set the internal
state of the client to use them. Also it saves the credentials in local storage, so the
user stays logged in with Money Button if they close the browser.

If you are working server side there is another convenient method on the client:

``` javascript
client.authorizeWithAuthFlowResponse(receivedQueryParameters, expectedStateValue, redirectUri)
```

This is going to complete the flow to get a refresh token, and it's going to save it internally.
If you want to save the refresh token for the future you can retrieve it like this:

``` javascript
const refreshToken = client.getRefreshToken();
```

Later on, you can use the retrieved refresh token on a new instance of the client:

``` javascript
const client = new MoneyButtonClient(YOUR_OAUTH_IDENTIFIER)
client.setRefreshToken(refreshToken)
```


## Get App Credentials

The client also has a convenient method to log in as an app. With this, you get permissions appropriate for an app, such as the payments history for that app.

``` javascript
const client = new MoneyButtonClient(YOUR_CLIENT_IDENTIFIER, YOUR_CLIENT_SECRET)
await client.logInAsApp()
// The client is now logged in as an app!
```
