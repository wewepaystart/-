import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const htmlPath = path.resolve(process.cwd(), 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

test('index.html contains required editable config constants', () => {
  assert.match(html, /const BANNER_URL\s*=\s*"bunner\.png";/);
  assert.match(html, /const APK_URL\s*=\s*"app\.apk";/);
  assert.match(html, /const ICON_URL\s*=\s*"logo\.png";/);
  assert.match(html, /const APP_NAME\s*=\s*"ဝက်ကြီး";/);
});

test('index.html includes viewport, title, and Open Graph tags', () => {
  assert.match(html, /<meta\s+name="viewport"/);
  assert.match(html, /<title>.*<\/title>/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /property="og:description"/);
  assert.match(html, /property="og:type"/);
  assert.match(html, /property="og:image"/);
});

test('index.html includes both download buttons with download attribute and toast text', () => {
  assert.match(html, /id="heroDownloadBtn"[\s\S]*?download/);
  assert.match(html, /id="barDownloadBtn"[\s\S]*?download/);
  assert.match(html, /DOWNLOAD APP/);
  assert.match(
    html,
    /Download starting\.\.\. If blocked, allow installs from this browser in Android settings\./
  );
});

test('index.html uses no external JS/CSS frameworks', () => {
  assert.doesNotMatch(html, /tailwindcss|bootstrap|react|vue|jquery/i);
});
