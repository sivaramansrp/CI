const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];
const indexPath = path.join('dist', 'apps', projectName, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const version = process.env.VERSION || require('../../package.json').version;

// Ensure this ID exists in your index.html
html = html.replace(
  '</body>',
  `<script>document.getElementById('app-version').textContent = 'v${version}';</script></body>`
);

fs.writeFileSync(indexPath, html, 'utf8');
console.log(`✅ Injected version ${version} into ${indexPath}`);
