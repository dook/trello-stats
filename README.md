# Trello Stats

Trello Stats is an application for tracking tasks progress.

## Getting started

1. Clone this repository.
2. `yarn install` to install all required dependencies.
3. `yarn start` to run local development server.
4. `yarn lint` to lint project.
5. `yarn build` to build project.

To run tests use `yarn test`. For more commands check the `package.json` file.

## Overview

This project is based on **redux** and **redux-saga**.

### Configuration

If you are going to connect your API during development, you should change value of `REACT_APP_API_URL` property in `.env.local`.

```javascript
DEFAULT_API_URL: 'http://localhost:8080'
```

### Redux

This project has combined API requests with Redux. You can use methods below to handle requests in your store.

#### `apiAction(type, endpoint, method, [options])`

An action creator generates action for an API request.

* `type` *(string)* - The type of the action.
* `endpoint` *(string)* - The endpoint URL.
* `method` *(string)* - The type of the HTTP request method (GET, POST, etc.).
* `options` *(object)* - Additional things which may extend the action.
* `options.payload` *(object)* - The payload data sending to API.
* `options.afterSagaSuccess` *(function)* - The generator function that will be call after success in saga.

You can use `options.afterSagaSuccess` to call other action. For example:

```javascript
afterSagaSuccess: function* () {
  yield put(someActions.getSomeData());
}
```

#### `apiSaga(type)`

Method creates saga for an API request.

* `type` *(string)* - The type of the action.

#### `apiReducer(type, [reduceSuccess])`

Method creates reducer for an API request.

* `type` *(string)* - The type of the action.
* `reduceSuccess` *(function)* - The callback function to customize state after success.

You can use `reduceSuccess` to modify and return new state. For example:

```javascript
list: apiReducer('FEED_LIST', (state, action) => {
  let data = {...action.data};

  const newData = data.map((item) => {
    // Modify original data from API
  });

  return { ...state, data: newData };
})
```
