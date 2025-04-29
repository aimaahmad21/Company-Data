const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'MarketVerse',
    embeddedScreenshots: true,
    reportDir: 'cypress/reports',
    reportFilename: 'marketVerse.html',
    overwrite: true,
    inlineAssets: true,
    saveAllAttempts: false,
    videoOnFailOnly: true,
    saveAllAttempts: true,
    debug: false
  },
  e2e: {
    baseUrl: 'https://next-app.marketverse.ai/login/',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    }
  },
  watchForFileChanges: false,
  // chromeWebSecurity: false,
  video: true,
  retries: 0,
  defaultCommandTimeout: 10000,
  experimentalStudio: true,
  responseTimeout: 60000,
});

