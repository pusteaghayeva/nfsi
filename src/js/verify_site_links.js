const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');

const englishPages = [
    'index.html',
    'about.html',
    'charter.html',
    'management.html',
    'structure.html',
    'accreditation.html',
    'quality-policy.html',
    'reports.html',
    'declaration.html',
    'food-safety.html',
    'animal-health.html',
    'plant-health.html',
    'complex-research.html',
    'mobile-laboratories.html',
    'sample-handling.html',
    'laboratory-tariffs.html',
    'testing-information.html',
    'trainings.html',
    'halal-certification.html',
    'proficiency-testing.html',
    'rating.html',
    'iso-22000.html',
    'haccp.html',
    'product-traceability.html',
    'technological-flow.html',
    'legislation.html',
    'international-events.html',
    'news.html',
    'allergens.html',
    'nutrition-hygiene.html',
    'myths.html',
    'scientific-articles.html',
    'mentorship.html',
    'volunteer.html',
    'citizen-reception-days.html',
    'entrepreneur-reception-days.html',
    'complaints.html',
    'contact.html',
    'career.html',
    'city-laboratory.html'
];

console.log('Testing', englishPages.length, 'English-named HTML pages...');
let errors = 0;

for (const p of englishPages) {
    const full = path.join(rootDir, p);
    if (!fs.existsSync(full)) {
        console.error(`[ERR] Missing page: ${p}`);
        errors++;
        continue;
    }
    const html = fs.readFileSync(full, 'utf8');

    // 1. Logo must point to index.html
    const logoTag = html.match(/<a[^>]*class=["']main_logo["'][^>]*>/i);
    if (!logoTag || !logoTag[0].includes('href="index.html"')) {
        console.error(`[ERR] ${p}: Logo tag does not link to index.html -> ${logoTag ? logoTag[0] : 'null'}`);
        errors++;
    }

    // 2. Check for broken local .html links
    const localLinks = html.match(/href=["']([a-zA-Z0-9_\-]+\.html)["']/g) || [];
    for (const ll of localLinks) {
        const target = ll.replace(/href=["']/, '').replace(/["']$/, '');
        if (!fs.existsSync(path.join(rootDir, target))) {
            console.error(`[ERR] ${p}: Broken link to '${target}'`);
            errors++;
        }
    }

    // 3. Check for external CDNs (fonts, scripts, styles)
    const cdns = html.match(/https?:\/\/(?:cdnjs|jsdelivr|unpkg|googleapis|gstatic|bootstrapcdn|code\.jquery)[^"'\s\<\>\(\)]+/gi);
    if (cdns) {
        console.error(`[ERR] ${p}: Contains external CDN links:`, cdns);
        errors++;
    }
}

// Check contact.html for Naxçıvan coordinates and map
const contactFull = path.join(rootDir, 'contact.html');
if (fs.existsSync(contactFull)) {
    const cHtml = fs.readFileSync(contactFull, 'utf8');
    if (cHtml.includes('39.22297286987305')) {
        console.log('✓ contact.html: Naxçıvan Google Map coordinates verified.');
    } else {
        console.error('[ERR] contact.html: missing Naxçıvan coordinates!');
        errors++;
    }
}

// Check index.html Nakhchivan map & pins
const indexFull = path.join(rootDir, 'index.html');
if (fs.existsSync(indexFull)) {
    const iHtml = fs.readFileSync(indexFull, 'utf8');
    if (iHtml.includes('39.17927932739258') && iHtml.includes('39.22323989868164')) {
        console.log('✓ index.html: Babək and Naxçıvan map pins verified.');
    } else {
        console.error('[ERR] index.html: missing Babək or Naxçıvan pins!');
        errors++;
    }
}

// Check font.css
const fontCss = path.join(rootDir, 'src', 'css', 'font.css');
if (fs.existsSync(fontCss)) {
    const fContent = fs.readFileSync(fontCss, 'utf8');
    if (fContent.includes('googleapis') || fContent.includes('http')) {
        console.error('[ERR] font.css contains remote imports!');
        errors++;
    } else {
        console.log('✓ font.css: Verified 100% local fonts.');
    }
}

console.log('\n========================================');
console.log(`Verification Complete: ${englishPages.length} pages tested.`);
console.log(`Total Errors: ${errors}`);
console.log('========================================');
