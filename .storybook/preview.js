// .storybook/preview.js

import '../src/index.css'; //👈 The app's CSS file goes here
// const store = require('../src/lib/store');

//👇 Configures Storybook to log the actions( onArchiveTask and onPinTask ) in the UI.
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
