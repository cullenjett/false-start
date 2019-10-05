/**
 * This script can be used to run a Lighthouse audit on the URL passed
 * as an argument at execution.
 *
 * For the most part this is pulled from the lighthouse cli docs:
 * https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically
 *
 * ex: `node scripts/run-lighthouse.js http://localhost:80`
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const [, , url] = process.argv;

console.log(`Running lighthouse audit against ${url}`);

launchChromeAndRunLighthouse(url).then((results) => {
  // TODO: send this data somewhere...
  console.log(parseLighthouseResults(results));
});

async function launchChromeAndRunLighthouse(url, opts = {}, config = null) {
  const chrome = await chromeLauncher.launch({ chromeFlags: opts.chromeFlags });

  opts.port = chrome.port;
  const results = await lighthouse(url, opts, config);

  await chrome.kill();

  return results.lhr;
}

function parseLighthouseResults(results) {
  return {
    performance: {
      score: results.categories.performance.score,

      firstContentfulPaint: parseAuditResults(
        results.audits,
        'first-contentful-paint'
      ),
      firstMeaningfulPaint: parseAuditResults(
        results.audits,
        'first-meaningful-paint'
      ),
      speedIndex: parseAuditResults(results.audits, 'speed-index'),
      firstCpuIdle: parseAuditResults(results.audits, 'first-cpu-idle'),
      timeToInteractive: parseAuditResults(results.audits, 'interactive'),
      maxPotentialFid: parseAuditResults(results.audits, 'max-potential-fid'),
    },
    accessibility: {
      score: results.categories.accessibility.score,
    },
    bestPractices: {
      score: results.categories['best-practices'].score,
    },
    seo: {
      score: results.categories.seo.score,
    },
    pwa: {
      score: results.categories.pwa.score,
    },
  };
}

function parseAuditResults(auditResults, keyName) {
  return {
    score: auditResults[keyName].score,
    displayValue: auditResults[keyName].displayValue,
  };
}
