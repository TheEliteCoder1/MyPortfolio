const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: true,
    screenshotOnRunFailure: true,
    expose: {
      API_URL: 'http://localhost:5000', 
      ADMIN_EMAIL: 'daelitecoder1@gmail.com', 
      ADMIN_PASSWORD: 'AdminPassword123',   
    },
  },
});