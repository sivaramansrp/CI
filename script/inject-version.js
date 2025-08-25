const fs = require('fs');
const path = require('path');
const { version } = require('../package.json');

// Accept app name as a command-line argument
const appName = process.argv[2];
if (!appName) {
  console.error('Usage: node scripts/inject-version.js <app-name>');
  process.exit(1);
}

const distIndex = path.join(__dirname, `../dist/apps/${appName}/index.html`);
if (!fs.existsSync(distIndex)) {
  console.error(`index.html not found at ${distIndex}`);
  process.exit(1);
}

let indexHtml = fs.readFileSync(distIndex, 'utf8');
indexHtml = indexHtml.replace('Version: __BUILD_VERSION__', `Version: ${version}`);
fs.writeFileSync(distIndex, indexHtml);
console.log(`Injected version ${version} into ${distIndex}`);
