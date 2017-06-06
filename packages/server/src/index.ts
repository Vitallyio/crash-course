import App from './app';
const knexConfig = require('../knexfile');

// Create application
const port: number = 5000;
const app = new App(port, knexConfig.development);

// Start the server.
app.listen(() => {
  console.log('Node app is now running.', {'port': port});
});
