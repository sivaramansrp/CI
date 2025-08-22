const fs = require('fs');
const path = require('path');
const { version } = require('../package.json');

const envDir = path.join(__dirname, '..', 'src', 'environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}
const content = `export const APP_VERSION = 'PROFEPA:${version}';\n`;
const envDir = path.join(__dirname, '..', 'apps', 'profepa', 'src', 'environments');
