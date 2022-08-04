# Pokeapp

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Specification

- Search for Pokemon by `name` and filter the results by `type`
- Display the search results with enough detail to be able to identify to which Pokemon each
  result belongs.
- View more information about the Pokemon on a dedicated page by clicking a search result.
- See the previous search results when navigating back to the search page from the pokemon
  details page

## Known issues

- optimized view for a long list of results - e.g. lazy loading or show more
- error handling
- real API
- filtering by type - currently it gets options from the filtered list, so it reduces select options during filtering. It may lead to only single option available, "Clear select type" should be introduced

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
