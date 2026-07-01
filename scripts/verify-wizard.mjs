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
const assertNoCrypto = (actual) => {
  assert.equal(actual.bitcoin, 0, 'Bitcoin must be 0 when crypto is refused or blocked');
  assert.equal(actual.ethereum, 0, 'Ethereum must be 0 when crypto is refused or blocked');
  assert.equal(actual.bitcoinPercentage, 0, 'Bitcoin percentage must be 0 when crypto is refused or blocked');
  assert.equal(actual.ethereumPercentage, 0, 'Ethereum percentage must be 0 when crypto is refused or blocked');
};

const cryptoRefused50 = recommendation({ amount: 50, crypto: 'Non' });
assertAllocation(cryptoRefused50, { etfMonde: 50, bitcoin: 0, ethereum: 0 });
assertNoCrypto(cryptoRefused50);
assert.match(joined([cryptoRefused50.explanation, cryptoRefused50.objective, ...cryptoRefused50.nextActions]), /pas de bitcoin ni ethereum|sans bitcoin ni ethereum/);

const cryptoRefused100 = recommendation({ amount: 100, crypto: 'Non' });
assertAllocation(cryptoRefused100, { etfMonde: 100, bitcoin: 0, ethereum: 0 });
assertNoCrypto(cryptoRefused100);
assert.equal(cryptoRefused100.etfPercentage, 100, 'Crypto refused plan must remain 100% outside crypto');

const limitedCrypto = recommendation({ amount: 50, crypto: 'Oui, petite poche BTC/ETH' });
assertAllocation(limitedCrypto, { etfMonde: 35, bitcoin: 10, ethereum: 5 });
assert.ok(limitedCrypto.bitcoin + limitedCrypto.ethereum <= 15, 'Accepted crypto allocation for 50 €/month must stay small and limited');
assert.match(limitedCrypto.explanation.toLowerCase(), /petite poche/);

const noSecurity = recommendation({ security: 'Non', crypto: 'Oui, petite poche BTC/ETH' });
assert.match(noSecurity.priority.toLowerCase(), /sécurité/);
assert.match(joined([noSecurity.explanation, ...noSecurity.warnings, ...noSecurity.nextActions]), /préparer le pea/);
assertAllocation(noSecurity, { etfMonde: 100, bitcoin: 0, ethereum: 0 });
assertNoCrypto(noSecurity);

const shortHorizon = recommendation({ horizon: 'moins de 5 ans', crypto: 'Oui, petite poche BTC/ETH' });
assert.match(joined([shortHorizon.explanation, ...shortHorizon.warnings, ...shortHorizon.nextActions]), /volatil/);
assertAllocation(shortHorizon, { etfMonde: 100, bitcoin: 0, ethereum: 0 });
assertNoCrypto(shortHorizon);

const prudentProfile = recommendation({ risk: 'prudente', crypto: 'Oui, petite poche BTC/ETH' });
assertAllocation(prudentProfile, { etfMonde: 100, bitcoin: 0, ethereum: 0 });
assertNoCrypto(prudentProfile);
assert.match(joined([prudentProfile.explanation, ...prudentProfile.warnings]), /profil prudent/);

const prudentBeginner = recommendation({ risk: 'prudente', crypto: 'Oui, mais je débute' });
assertAllocation(prudentBeginner, { etfMonde: 100, bitcoin: 0, ethereum: 0 });
assertNoCrypto(prudentBeginner);
assert.match(joined([prudentBeginner.explanation, ...prudentBeginner.warnings]), /crypto.*0|0.*crypto|profil prudent/);

rmSync(outDir, { recursive: true, force: true });
console.log('Wizard verification passed.');
