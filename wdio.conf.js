const { join } = require('path');

exports.config = {
    runner: 'local',
    specs: ['./test/*.test.js'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu', '--window-size=1920,1080']
        }
    }],
    logLevel: 'warn',
    framework: 'mocha',
    reporters: [
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    services: [
        ['chromedriver', {
            logFileName: 'wdio-chromedriver.log', 
            outputDir: 'driver-logs',
            args: ['--silent']
        }],
        '@wdio/allure-reporter'
    ],
    before: async function() {
        await browser.setTimeout({ 'implicit': 5000 });
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await browser.takeScreenshot();
            const screenshotPath = join(process.cwd(), `screenshots/${test.title.replace(/ /g, '_')}.png`);
            await browser.saveScreenshot(screenshotPath);
            await allure.addAttachment('Screenshot', Buffer.from(screenshotPath, 'base64'), 'image/png');
        }
    }
};