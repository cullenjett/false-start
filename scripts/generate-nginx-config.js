/**
 * This script is used to create the production NGINX configuration file.
 *
 * NGINX doesn't support using environment variables, so we use a template engine
 * to inject those values into the config file at compile time. This is primarily
 * used to support a `PORT` variable, which is required by Google Cloud Run.
 */

const fs = require('fs');
const path = require('path');
const template = require('lodash.template');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

generateNginxConfig();

async function generateNginxConfig() {
  const templateString = (await readFile(
    resolveRelative('../nginx-template.conf')
  )).toString();

  const generateTemplate = template(removeFileComment(templateString));
  // Interpolate all process.env variables
  const nginxConfig = generateTemplate(process.env);

  return writeFile(resolveRelative('../nginx.conf'), nginxConfig);
}

function resolveRelative(p) {
  return path.resolve(__dirname, p);
}

function removeFileComment(string) {
  const token = 'END COMMENT';
  return string.slice(string.indexOf(token) + token.length, -1).trim();
}
