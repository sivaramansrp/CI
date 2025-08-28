const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];
const indexPath = path.join('dist', 'apps', projectName, 'index.html');
const version = process.env.VERSION || require('../../package.json').version;

let html = fs.readFileSync(indexPath, 'utf8');
html = html.replace('__BUILD_VERSION__', `v${version}`);
fs.writeFileSync(indexPath, html, 'utf8');

console.log(`✅ Injected version ${version} into ${indexPath}`);
