const fs = require('fs');
const path = require('path');
const { version } = require('../package.json');

const distIndex = path.join(__dirname, '../dist/apps/profepa/index.html');
let indexHtml = fs.readFileSync(distIndex, 'utf8');
indexHtml = indexHtml.replace('Version: __BUILD_VERSION__', `Version: ${version}`);
fs.writeFileSync(distIndex, indexHtml);
console.log(`Injected version ${version} into index.html`);
