const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

export const auditSite = (url: string, isMobile: boolean = true) => {
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

      // If its mobile Checker
      if (isMobile) {
        return lighthouse(url, opts).then((results) => {
          return chrome.kill().then(() => results.report)
        })
      }

      // If its desktop Checker
      const extendedOpts = {
        extends: 'lighthouse:default',
        settings: {
          formFactor: 'desktop',
          throttling: {
            rttMs: 40,
            throughputKbps: 10240,
            cpuSlowdownMultiplier: 1,
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0,
          },
          screenEmulation: {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false,
          },
          emulatedUserAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4143.7 Safari/537.36 Chrome-Lighthouse',
        },
      }
      return lighthouse(url, opts, extendedOpts).then((results) => {
        return chrome.kill().then(() => results.report)
      })
    })
}
