const fs = require('fs-extra');
const path = require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const glob = require('glob');
const { URL } = require('url');

const VIEWS_DIR = path.join(__dirname, 'public'); // change if needed
const VENDOR_DIR = path.join(__dirname, 'public/vendor');

async function downloadFile(url) {
  const parsed = new URL(url);
  const localPath = path.join(
    VENDOR_DIR,
    parsed.hostname,
    parsed.pathname
  );

  const cleanPath = localPath.split('?')[0];
  await fs.ensureDir(path.dirname(cleanPath));

  if (await fs.pathExists(cleanPath)) {
    console.log(`✓ Exists: ${cleanPath}`);
    return cleanPath;
  }

  console.log(`↓ Downloading: ${url}`);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed: ${url}`);

  const buffer = await res.buffer();
  await fs.writeFile(cleanPath, buffer);

  return cleanPath;
}

function toVendorPath(url) {
  const parsed = new URL(url);
  return `/vendor/${parsed.hostname}${parsed.pathname}`.split('?')[0];
}

async function processCSS(filePath) {
  let content = await fs.readFile(filePath, 'utf8');

  const urlRegex = /url\((.*?)\)/g;
  let match;

  while ((match = urlRegex.exec(content)) !== null) {
    let assetUrl = match[1].replace(/['"]/g, '');

    if (assetUrl.startsWith('http')) {
      try {
        const localPath = await downloadFile(assetUrl);
        const vendorPath = toVendorPath(assetUrl);
        content = content.replace(assetUrl, vendorPath);
      } catch (err) {
        console.error(`CSS asset failed: ${assetUrl}`);
      }
    }
  }

  await fs.writeFile(filePath, content);
}

async function processHTML(filePath) {
  console.log(`\nProcessing: ${filePath}`);

  const html = await fs.readFile(filePath, 'utf8');
  const $ = cheerio.load(html);

  const elements = [
    ...$('script[src]').toArray(),
    ...$('link[href]').toArray()
  ];

  for (let el of elements) {
    const attr = el.name === 'script' ? 'src' : 'href';
    const url = $(el).attr(attr);

    if (url && url.startsWith('http')) {
      try {
        await downloadFile(url);
        const vendorPath = toVendorPath(url);
        $(el).attr(attr, vendorPath);

        // If CSS file, process nested assets
        if (vendorPath.endsWith('.css')) {
          const cssPath = path.join(
            __dirname,
            'public',
            vendorPath.replace('/vendor/', 'vendor/')
          );
          await processCSS(cssPath);
        }
      } catch (err) {
        console.error(`Failed: ${url}`);
      }
    }
  }

  await fs.writeFile(filePath, $.html());
}

async function run() {
  await fs.ensureDir(VENDOR_DIR);

  const files = glob.sync(`${VIEWS_DIR}/**/*.html`);

  for (let file of files) {
    await processHTML(file);
  }

  console.log('\n✅ All CDN assets mirrored successfully.');
}

run();