const fs = require('fs');
const path = require('path');
const { version } = require('../package.json');

// Get app name from command line argument
const appName = process.argv[2];
if (!appName) {
  console.error('❌ Please provide an app name as an argument.');
  process.exit(1);
}

const indexPath = path.join(__dirname, '..', 'dist', 'apps', appName, 'index.html');

try {
  let html = fs.readFileSync(indexPath, 'utf8');

  // Replace placeholder with version
  html = html.replace(/__BUILD_VERSION__/g, version);

  fs.writeFileSync(indexPath, html);
  console.log(`✅ Injected version ${version} into ${indexPath}`);
} catch (err) {
  console.error(`❌ Failed to inject version: ${err.message}`);
  process.exit(1);
}

