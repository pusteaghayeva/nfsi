const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');
const cssDir = path.join(rootDir, 'src', 'css');

// 1. Check all HTML files for broken local image/asset references
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
let brokenAssets = 0;
let checkedAssets = 0;

for (const hf of htmlFiles) {
    const content = fs.readFileSync(path.join(rootDir, hf), 'utf8');
    
    // Check src="..."
    const srcs = content.match(/src=["']([^"']+)["']/gi) || [];
    for (const s of srcs) {
        const val = s.replace(/src=["']/, '').replace(/["']$/, '');
        if (val.startsWith('http') || val.startsWith('data:') || val.startsWith('//') || val.length === 0) continue;
        checkedAssets++;
        const targetPath = path.resolve(rootDir, val);
        if (!fs.existsSync(targetPath)) {
            console.error(`[BROKEN SRC] in ${hf}: ${val}`);
            brokenAssets++;
        }
    }
    
    // Check link hrefs for css
    const hrefs = content.match(/<link[^>]+href=["']([^"']+)["']/gi) || [];
    for (const hr of hrefs) {
        const val = hr.match(/href=["']([^"']+)["']/i)[1];
        if (val.startsWith('http') || val.startsWith('data:') || val.startsWith('//') || val.length === 0) continue;
        checkedAssets++;
        const targetPath = path.resolve(rootDir, val);
        if (!fs.existsSync(targetPath)) {
            console.error(`[BROKEN LINK] in ${hf}: ${val}`);
            brokenAssets++;
        }
    }
}

// 2. Check CSS files for broken url(...)
let brokenCssUrls = 0;
let checkedCssUrls = 0;
for (const cf of fs.readdirSync(cssDir)) {
    if (!cf.endsWith('.css')) continue;
    const content = fs.readFileSync(path.join(cssDir, cf), 'utf8');
    const urls = content.match(/url\(['"]?([^'")]+)['"]?\)/gi) || [];
    for (const u of urls) {
        const val = u.replace(/url\(['"]?/, '').replace(/['"]?\)$/, '');
        if (val.startsWith('http') || val.startsWith('data:') || val.startsWith('//') || val.startsWith('#') || val.length === 0) continue;
        checkedCssUrls++;
        const resolved = path.resolve(cssDir, val);
        if (!fs.existsSync(resolved)) {
            console.warn(`[CSS URL NOT FOUND] in ${cf}: ${val}`);
            brokenCssUrls++;
        }
    }
}

console.log(`\nIntegrity Report:`);
console.log(`- Checked ${htmlFiles.length} HTML files.`);
console.log(`- Checked ${checkedAssets} local asset references in HTML. Broken: ${brokenAssets}`);
console.log(`- Checked ${checkedCssUrls} url() references in CSS. Broken: ${brokenCssUrls}`);
