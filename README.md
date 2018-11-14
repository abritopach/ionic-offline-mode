# IonicOfflineMode

Sample project that shows how to build an Dogs breeds APP with offline mode that caches API data so it can be used as a fallback later. Also, we create an offline manager which stores requests made during that time so we can later send out the calls one by one when we are online again.

This project is an example created in the [Devdactic Blog](https://devdactic.com/ionic-4-offline-mode/) that have been modified by me. This project has been developed to practice my skills with the tech stack shown above.

This project shows you how to:

    * Use Capacitor in Ionic 4.
    * Show dogs breeds list.
    * Add new dog breed.
    * Handling network changes.
    * Storing API requests locally.
    * Making API requests with local caching.

Technologies: Ionic, Capacitor, TypeScript.

## Start fake json server

```bash
    $ cd json-server
    $ json-server --watch db.json
```

## Running

Before you go through this example, you should have at least a basic understanding of Ionic concepts. You must also already have Ionic installed on your machine.

* Test in localhost:

To run it, cd into `ionic-offline-mode` and run:

```bash
npm install
ionic serve
```

## Capacitor: Add Platforms

``` bash
    $ npx cap add ios
    $ npx cap add android
```

## Capacitor: Syncing your app
Every time you perform a build (e.g. npm run build) that changes your web directory (default: www), you'll need to copy those changes down to your native projects:

``` bash
    $ npx cap copy
```

## Capacitor: Open IDE to build

``` bash
    $ npx cap open ios
    $ npx cap open android
```

## Requirements

* [Node.js](http://nodejs.org/)
* [Ionic](https://ionicframework.com/getting-started#cli)