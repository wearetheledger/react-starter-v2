# React starter v2 
[![travis badge](https://travis-ci.org/wearetheledger/react-starter-v2.svg?branch=master)](https://travis-ci.org/wearetheledger/react-starter-v2)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- [Features](#features)
- [Available Scripts](#available-scripts)
- [Authentication providers](#authentication)
- [Code generation](#code-generation)
- [Recommended packages](#recommended-packages)
- [Possible issues](#possible-issues)

## Features

- styled components
- redux
- typescript
- ant design
- swagger code generator
- localization (react-intl)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn run generate-swagger`

Generates code based on swagger definitions.<br>
Requires a backend to be running.

If you want, you can change the backend url in the package.json<br>
`node scripts/codegen.js http://localhost:5000/api-json`

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Authentication

Authentication is configured for **Auth0** using [`react-simple-auth`](https://github.com/mattmazzola/react-simple-auth) as an example.

### Change authentication provider

To change the authentication provider, you have to create a new provider in `src/utils/auth`. This provider should implement following interface:
```typescript
export interface IProvider<T> {
    buildAuthorizeUrl(): string;
    extractError(redirectUrl: string): Error | undefined;
    extractSession(redirectUrl: string): T;
    validateSession(session: T): boolean;
    getAccessToken(session: T, resourceId: string): string;
    getSignOutUrl(redirectUrl: string): string;
}
```

You can take a look at the [Auth0Provider](src/utils/auth/auth0Provider.ts) for an example.

The only other thing you should do, is to go to [src/store/reducers/authReducer.ts](src/store/reducers/authReducer.ts) and replace the `Auth0IdToken` by your newly created interface.


## Code generation

Please use [plopjs](https://plopjs.com/documentation/) to generate pages, components & redux actions to keep code consistency.

You can do this by globally installing plop `npm i -g plop` and running the `plop` command in the root of this project.

## Recommended packages
Please continue suggesting and adding interesting packages.

- charting library [nivo](https://nivo.rocks)
- maps [mapbox](https://www.mapbox.com/maps/)

## Possible issues
### Lodash
We use [`lodash-webpack-plugin`](https://github.com/lodash/lodash-webpack-plugin) to reduce the bundle size and only import lodash functions which are used. For this, we only enable certain features of lodash in `craco.config.js`. Please change the settings there if you are experiencing issues.



