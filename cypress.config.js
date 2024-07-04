const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://web.superfrete.com/',
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'edge') {
          launchOptions.args.push('--ignore-certificate-errors')
        }
        return launchOptions;
      });
    },
    viewportWidth: 1366,
    viewportHeight: 768,
    chromeWebSecurity: false, 
  },
});
