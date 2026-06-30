import assert from 'node:assert/strict';
import { rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const outDir = resolve('.wizard-verify');
rmSync(outDir, { recursive: true, force: true });

execFileSync(
  'npx',
  [
    'tsc',
    '--ignoreConfig',
    '--target',
    'ES2022',
    '--module',
    'CommonJS',
    '--moduleResolution',
    'Node',
    '--ignoreDeprecations',
    '6.0',
    '--skipLibCheck',
    '--outDir',
    outDir,
    'src/utils/wizard.ts',
    'src/data/allocations.ts',
  ],
  { stdio: 'inherit' },
);

const { buildWizardRecommendation } = await import(pathToFileURL(resolve(outDir, 'utils/wizard.js')));

const baseAnswers = {
  amount: 100,
  crypto: 'Non',
  horizon: '10 à 20 ans',
  security: 'Oui',
  risk: 'équilibrée',
  platform: 'Aucune',
};

const recommendation = (overrides) => buildWizardRecommendation({ ...baseAnswers, ...overrides });
const assertAllocation = (actual, expected) => {
  assert.equal(actual.etfMonde, expected.etfMonde, 'ETF Monde allocation mismatch');
  assert.equal(actual.bitcoin, expected.bitcoin, 'Bitcoin allocation mismatch');
  assert.equal(actual.ethereum, expected.ethereum, 'Ethereum allocation mismatch');
};
const joined = (items) => items.join(' ').toLowerCase();

assertAllocation(recommendation({ amount: 50, crypto: 'Non' }), { etfMonde: 50, bitcoin: 0, ethereum: 0 });
assertAllocation(recommendation({ amount: 100, crypto: 'Non' }), { etfMonde: 100, bitcoin: 0, ethereum: 0 });
assertAllocation(recommendation({ amount: 50, crypto: 'Oui, petite poche BTC/ETH' }), { etfMonde: 35, bitcoin: 10, ethereum: 5 });

const noSecurity = recommendation({ security: 'Non', crypto: 'Oui, petite poche BTC/ETH' });
assert.match(noSecurity.priority.toLowerCase(), /sécurité/);
assert.match(joined([noSecurity.explanation, ...noSecurity.warnings, ...noSecurity.nextActions]), /préparer le pea/);
assertAllocation(noSecurity, { etfMonde: 100, bitcoin: 0, ethereum: 0 });

const shortHorizon = recommendation({ horizon: 'moins de 5 ans', crypto: 'Oui, petite poche BTC/ETH' });
assert.match(joined([shortHorizon.explanation, ...shortHorizon.warnings, ...shortHorizon.nextActions]), /volatil/);
assertAllocation(shortHorizon, { etfMonde: 100, bitcoin: 0, ethereum: 0 });

const prudentBeginner = recommendation({ risk: 'prudente', crypto: 'Oui, mais je débute' });
assertAllocation(prudentBeginner, { etfMonde: 100, bitcoin: 0, ethereum: 0 });
assert.match(joined([prudentBeginner.explanation, ...prudentBeginner.warnings]), /crypto.*0|0.*crypto|déconseill/);

rmSync(outDir, { recursive: true, force: true });
console.log('Wizard verification passed.');
