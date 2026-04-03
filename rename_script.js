const fs = require('fs');

const uiPage = 'src/app/tools/salary-coach/page.js';
let content = fs.readFileSync(uiPage, 'utf8');

// Update LOCATIONS
const newLocations = `const LOCATIONS = [
  { value: 'san_francisco', label: 'San Francisco, CA' },
  { value: 'new_york',      label: 'New York, NY' },
  { value: 'london',        label: 'London, UK' },
  { value: 'toronto',       label: 'Toronto, CA' },
  { value: 'sydney',        label: 'Sydney, AU' },
  { value: 'berlin',        label: 'Berlin, DE' },
  { value: 'singapore',     label: 'Singapore, SG' },
  { value: 'bangalore',     label: 'Bangalore, IN' },
  { value: 'remote',        label: 'Remote (Global)' },
];

const CURRENCIES = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'CAD', label: 'CAD (C$)' },
  { value: 'AUD', label: 'AUD (A$)' },
  { value: 'INR', label: 'INR (₹)' },
];`;

content = content.replace(/const LOCATIONS = \[[\s\S]*?\];/, newLocations);

// Update SCENARIOS
const newScenarios = `const SCENARIOS = [
  {
    label: 'SDE 4 yrs, $140K, San Francisco',
    data: { currency: 'USD', role: 'Software Engineer', yearsExperience: '4', offeredCTC: '140', currentCTC: '110', location: 'san_francisco', companyType: 'product', sector: 'general', skills: ['React', 'Node.js', 'AWS'] },
  },
  {
    label: 'Product Manager 6 yrs, £85K, London, MNC',
    data: { currency: 'GBP', role: 'Product Manager', yearsExperience: '6', offeredCTC: '85', currentCTC: '65', location: 'london', companyType: 'mnc', sector: 'fintech', skills: ['Product Roadmap', 'OKRs', 'Agile'] },
  },
  {
    label: 'Data Scientist 3 yrs, ₹18L, Bangalore, Startup',
    data: { currency: 'INR', role: 'Data Scientist', yearsExperience: '3', offeredCTC: '18', currentCTC: '12', location: 'bangalore', companyType: 'startup', sector: 'healthtech', skills: ['Python', 'TensorFlow', 'SQL'] },
  },
];`;
content = content.replace(/const SCENARIOS = \[[\s\S]*?\];/, newScenarios);

// Update form initial state
content = content.replace(/location:\s*'bangalore',/, `location: 'san_francisco',\n    currency: 'USD',`);
content = content.replace(/currentCTC:      form.currentCTC    \|\| f.currentCTC,/, `currentCTC:    data.currentCTC    || f.currentCTC,\n      currency:      data.currency      || f.currency,`);

// Update format helper
const formatHelper = `// ── Helpers ───────────────────────────────────────────────────────────────
function formatVal(val, curr) {
  if (curr === 'INR') return '₹' + val + 'L';
  if (curr === 'EUR') return '€' + val + 'K';
  if (curr === 'GBP') return '£' + val + 'K';
  return '$' + val + 'K';
}
function formatSuffix(curr) {
  if (curr === 'INR') return 'LPA';
  return '/ yr';
}

function getPctOnBar`;
content = content.replace(/\/\/ ── Helpers ───────────────────────────────────────────────────────────────\nfunction getPctOnBar/, formatHelper);

// Update text rendering in replace UI
content = content.replace(/₹\{ma\.minRange}L/g, '{formatVal(ma.minRange, form.currency)}');
content = content.replace(/₹\{ma\.midRange}L/g, '{formatVal(ma.midRange, form.currency)}');
content = content.replace(/₹\{ma\.maxRange}L/g, '{formatVal(ma.maxRange, form.currency)}');
content = content.replace(/₹\{ma\.offeredCTC}L/g, '{formatVal(ma.offeredCTC, form.currency)}');

content = content.replace(/₹\{results\.recommendedAsk\.target} <span className=\{styles\.askLpa}>LPA<\/span>/g, '{formatVal(results.recommendedAsk.target, form.currency)} <span className={styles.askLpa}>{formatSuffix(form.currency)}</span>');
content = content.replace(/₹\{results\.recommendedAsk\.minAcceptable} LPA/g, '{formatVal(results.recommendedAsk.minAcceptable, form.currency)} {formatSuffix(form.currency)}');
content = content.replace(/₹\{results\.recommendedAsk\.maxAsk} LPA/g, '{formatVal(results.recommendedAsk.maxAsk, form.currency)} {formatSuffix(form.currency)}');
content = content.replace(/₹\{results\.marketAnalysis\.midRange} LPA/g, '{formatVal(results.marketAnalysis.midRange, form.currency)} {formatSuffix(form.currency)}');

content = content.replace(/₹\{results\.marketAnalysis\.offeredCTC} LPA/g, '{formatVal(results.marketAnalysis.offeredCTC, form.currency)} {formatSuffix(form.currency)}');
content = content.replace(/₹\{results\.marketAnalysis\.minRange}–₹\{results\.marketAnalysis\.maxRange} LPA/g, '{formatVal(results.marketAnalysis.minRange, form.currency)} – {formatVal(results.marketAnalysis.maxRange, form.currency)} {formatSuffix(form.currency)}');
content = content.replace(/₹\{results\.recommendedAsk\.gapToMid} LPA/g, '{formatVal(results.recommendedAsk.gapToMid, form.currency)} {formatSuffix(form.currency)}');

// Add currency field to form body POST
content = content.replace(/role:\s*form\.role,/, `role:            form.role,\n          currency:        form.currency,`);

// Add currency selector UI
const currencyDropdown = `
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Currency</label>
                  <div className={styles.selectWrapper}>
                    <select value={form.currency} onChange={e => setField('currency', e.target.value)}>
                      {CURRENCIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                    <IconChevDown />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Location</label>
                  <div className={styles.selectWrapper}>
                    <select value={form.location} onChange={e => setField('location', e.target.value)}>
`;
content = content.replace(/<div className=\{styles\.inputGroup\}>\s*<label>Location<\/label>\s*<div className=\{styles\.selectWrapper\}>\s*<select value=\{form\.location\} onChange=\{e => setField\('location', e\.target\.value\)\}>/, currencyDropdown);

content = content.replace(/India-focused salary benchmarks/, 'Global salary benchmarks');

fs.writeFileSync(uiPage, content, 'utf8');

// Update API
const apiRoute = 'src/app/api/salary-coach/route.js';
let apiContent = fs.readFileSync(apiRoute, 'utf8');

apiContent = apiContent.replace(/const { role, yearsExperience, offeredCTC, currentCTC, location, companyType, sector, skills } = await req.json\(\);/, 'const { role, yearsExperience, offeredCTC, currentCTC, location, companyType, sector, skills, currency = "USD" } = await req.json();');

apiContent = apiContent.replace(/function generateNegotiationScripts\(analysis, range, ask, skills, form\) {/, 'function generateNegotiationScripts(analysis, range, ask, skills, form) {');

const apiFormatHelper = `
function fmt(val, cur) {
  if (cur === 'INR') return '₹' + val + 'L';
  if (cur === 'EUR') return '€' + val + 'K';
  if (cur === 'GBP') return '£' + val + 'K';
  return '$' + val + 'K';
}
function sfx(cur) {
  if (cur === 'INR') return 'LPA';
  return '/ yr';
}
function sm(val, cur) {
  if (cur === 'INR') return '₹' + val;
  if (cur === 'EUR') return '€' + val;
  if (cur === 'GBP') return '£' + val;
  return '$' + val;
}
`;

apiContent = apiContent.replace(/function ROUND_TO_HALF\(num\) {/, apiFormatHelper + '\nfunction ROUND_TO_HALF(num) {');

// Fix strings
apiContent = apiContent.replace(/₹\$\{offer\} LPA/g, '${fmt(offer, currency)} ${sfx(currency)}');
apiContent = apiContent.replace(/₹\$\{range\.mid\} LPA/g, '${fmt(range.mid, currency)} ${sfx(currency)}');
apiContent = apiContent.replace(/₹\$\{range\.min\}–₹\$\{range\.max\} LPA/g, '${fmt(range.min, currency)}–${fmt(range.max, currency)} ${sfx(currency)}');
apiContent = apiContent.replace(/₹4Cr/g, '${sm(\"2M\", currency)}');
apiContent = apiContent.replace(/₹\$\{ask\.target\} LPA/g, '${fmt(ask.target, currency)} ${sfx(currency)}');
apiContent = apiContent.replace(/₹\$\{ask\.minAcceptable\} LPA/g, '${fmt(ask.minAcceptable, currency)} ${sfx(currency)}');
apiContent = apiContent.replace(/₹\[Amount\]/g, '${sm(\"[Amount]\", currency)}');
apiContent = apiContent.replace(/₹\[Final Agreed Amount\] LPA/g, '[Final Agreed Amount]');
apiContent = apiContent.replace(/₹\$\{ROUND_TO_HALF\(gap \* 0\.5\)\}–₹\$\{ROUND_TO_HALF\(gap \* 1\.0\)\}L/g, '${fmt(ROUND_TO_HALF(gap * 0.5), currency)}–${fmt(ROUND_TO_HALF(gap * 1.0), currency)}');
apiContent = apiContent.replace(/₹2,000–₹6,000/g, '${sm(\"200\", currency)}–${sm(\"600\", currency)}');
apiContent = apiContent.replace(/₹30,000–₹1,00,000/g, '${sm(\"3,000\", currency)}–${sm(\"10,000\", currency)}');
apiContent = apiContent.replace(/₹5L\+/g, '${sm(\"500,000\", currency)}+');
apiContent = apiContent.replace(/₹50,000–₹3,00,000/g, '${sm(\"5,000\", currency)}–${sm(\"30,000\", currency)}');
apiContent = apiContent.replace(/₹50,000–₹2,00,000/g, '${sm(\"5,000\", currency)}–${sm(\"20,000\", currency)}');
apiContent = apiContent.replace(/₹30,000–₹80,000/g, '${sm(\"3,000\", currency)}–${sm(\"8,000\", currency)}');

// Fix signature parameters
apiContent = apiContent.replace(/function generateNegotiationScripts\(analysis, range, ask, skills, form\) {/, 'function generateNegotiationScripts(analysis, range, ask, skills, form, currency) {');
apiContent = apiContent.replace(/generateNegotiationScripts\(analysis, range, ask, skills, \{role, location\}\)/, 'generateNegotiationScripts(analysis, range, ask, skills, {role, location}, currency)');

apiContent = apiContent.replace(/function generateEmailTemplates\(analysis, range, ask, form\) {/, 'function generateEmailTemplates(analysis, range, ask, form, currency) {');
apiContent = apiContent.replace(/generateEmailTemplates\(analysis, range, ask, \{role, location, companyType\}\)/, 'generateEmailTemplates(analysis, range, ask, {role, location, companyType}, currency)');

apiContent = apiContent.replace(/function buildAdditionalItems\(gap, analysis\) {/, 'function buildAdditionalItems(gap, analysis, currency) {');
apiContent = apiContent.replace(/buildAdditionalItems\(ask\.gapToMid, analysis\)/, 'buildAdditionalItems(ask.gapToMid, analysis, currency)');

fs.writeFileSync(apiRoute, apiContent, 'utf8');

// Update LinkedIn Studio
const linkedinApi = 'src/app/api/linkedin-studio/route.js';
let linkedinContent = fs.readFileSync(linkedinApi, 'utf8');
linkedinContent = linkedinContent.replace(/Best posting times \(India-focused\)/, 'Best posting times (Global Localized)');
linkedinContent = linkedinContent.replace(/- Weekdays: 8:30 AM to 10:30 AM IST \(Morning commute\)\\n- Weekdays: 5:00 PM to 6:30 PM IST \(Evening wrap-up\)\\n- Weekends: Saturday 9:30 AM to 11:00 AM IST/, '- Weekdays: 8:30 AM to 10:30 AM local time (Morning commute)\\n- Weekdays: 5:00 PM to 6:30 PM local time (Evening wrap-up)\\n- Weekends: Saturday 9:30 AM to 11:00 AM local time');
fs.writeFileSync(linkedinApi, linkedinContent, 'utf8');

console.log('All replacements completed!');
