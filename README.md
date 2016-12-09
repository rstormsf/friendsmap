# friendsmapvue

> Stack:

  * [Vue.js](https://vuejs.org)
  * [Vuex](https://vuex.vuejs.org)
  * [Vue-router](http://router.vuejs.org/en/)
  * [Firebase](http://firebase.google.com)
  * [FirebaseUI-web](https://github.com/firebase/firebaseui-web) for auth

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


Please setup .env file with the following values:
```
FB_API_KEY=xxxxFQs
FB_AUTH_DOMAIN=YOURAPPNAME.firebaseapp.com
FB_DATABASE_URL=https://YOURAPPNAME.firebaseio.com
FB_STORAGE_BUCKET=YOURAPPNAME.appspot.com
FB_MESSAGING_SENDER_ID=12345

```

also in order to have `firebase deploy` working, please do `firebase init` or simply add `.firebaserc` file to the root:

```
{
  "projects": {
    "default": "YOURAPPNAME"
  }
}
```