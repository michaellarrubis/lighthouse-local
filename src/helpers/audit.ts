const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

export const auditSite = (url: string) => {
  return chromeLauncher
    .launch({
      startingUrl: url,
      chromeFlags: ['--no-sandbox', '--headless', '--disable-gpu'],
    })
    .then(async (chrome) => {
      console.log(`Chrome debugging port running on ${chrome.port}`)
      const opts = {
        port: chrome.port,
        logLevel: 'info',
        output: 'html',
      }
      const extendedOpts = {
        extends: 'lighthouse:default',
        settings: {
          emulatedFormFactor: 'desktop',
          output: ['html'],
        },
      }
      return lighthouse(url, opts, extendedOpts).then((results) => {
        return chrome.kill().then(() => results.report)
      })
    })
}
