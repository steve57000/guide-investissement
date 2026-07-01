import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const root = process.cwd();
const errors = [];
const warnings = [];

const fromRoot = (...parts) => path.join(root, ...parts);
const rel = (file) => path.relative(root, file).replaceAll(path.sep, '/');
const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

function read(file) {
  return fs.readFileSync(fromRoot(file), 'utf8');
}

function loadTs(file, names) {
  const filename = fromRoot(file);
  const source = fs.readFileSync(filename, 'utf8');
  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: filename,
  }).outputText;
  const sandbox = { exports: {}, module: { exports: {} }, require };
  vm.runInNewContext(js, sandbox, { filename });
  const exported = { ...sandbox.module.exports, ...sandbox.exports };
  return Object.fromEntries(names.map((name) => [name, exported[name]]));
}

function duplicates(items) {
  const seen = new Set();
  const dupes = new Set();
  for (const item of items) {
    if (seen.has(item)) dupes.add(item);
    seen.add(item);
  }
  return [...dupes];
}

function assertNonEmpty(value, message) {
  if (typeof value !== 'string' || value.trim() === '') fail(message);
}

const { mainNav, understandSections, footerLinks } = loadTs('src/data/navigation.ts', ['mainNav', 'understandSections', 'footerLinks']);
const { sitePages } = loadTs('src/data/sitePages.ts', ['sitePages']);
const { sources } = loadTs('src/data/sources.ts', ['sources']);
const { allocations } = loadTs('src/data/allocations.ts', ['allocations']);

const pageHrefs = new Set(sitePages.map((page) => page.href));

function verifyNavigation() {
  const navLinks = [...mainNav, ...understandSections.flatMap((section) => section.links), ...footerLinks];
  for (const [href, label] of navLinks) {
    if (!pageHrefs.has(href)) fail(`Navigation: le lien "${href}" n'existe pas dans src/data/sitePages.ts.`);
    assertNonEmpty(label, `Navigation: le lien "${href}" a un label vide.`);
  }

  for (const href of duplicates(mainNav.map(([href]) => href))) fail(`Navigation: href dupliqué dans mainNav: "${href}".`);
  for (const href of duplicates(understandSections.flatMap((section) => section.links.map(([href]) => href)))) fail(`Navigation: href dupliqué dans understandSections: "${href}".`);
  for (const href of duplicates(footerLinks.map(([href]) => href))) fail(`Navigation: href dupliqué dans footerLinks: "${href}".`);
  for (const [href] of footerLinks) {
    if (!pageHrefs.has(href)) fail(`Footer: le lien "${href}" n'existe pas dans src/data/sitePages.ts.`);
  }
  if (mainNav.length > 10) fail(`Navigation: mainNav contient ${mainNav.length} liens, limite raisonnable fixée à 10.`);
}

function verifySitePages() {
  for (const href of duplicates(sitePages.map((page) => page.href))) fail(`Pages: href dupliqué dans sitePages: "${href}".`);

  const ignoredAstroPages = new Set(['index', '[slug]']);
  const directAstroPages = fs
    .readdirSync(fromRoot('src/pages'), { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.astro'))
    .map((entry) => entry.name.replace(/\.astro$/, ''))
    .filter((slug) => !ignoredAstroPages.has(slug));

  for (const slug of directAstroPages) {
    if (!pageHrefs.has(slug)) {
      fail(`Pages: fichier orphelin src/pages/${slug}.astro absent de src/data/sitePages.ts.`);
    }
  }

  for (const page of sitePages) {
    assertNonEmpty(page.title, `Pages: titre vide pour href "${page.href}".`);
    assertNonEmpty(page.description, `Pages: description vide pour "${page.href}".`);
    if (!Array.isArray(page.keywords) || page.keywords.length === 0 || page.keywords.some((keyword) => typeof keyword !== 'string' || keyword.trim() === '')) {
      fail(`Pages: keywords absents ou invalides pour "${page.href}".`);
    }

    const astroPage = page.href === '' ? fromRoot('src/pages/index.astro') : fromRoot('src/pages', `${page.href}.astro`);
    const mdPage = page.href === '' ? null : fromRoot('src/content/pages', `${page.href}.md`);
    if (!fs.existsSync(astroPage) && !(mdPage && fs.existsSync(mdPage))) {
      fail(`Pages: "${page.href || 'index'}" ne correspond à aucun fichier src/pages/*.astro ou src/content/pages/*.md.`);
    }
  }
}

function verifySources() {
  const required = ['id', 'title', 'organization', 'url', 'category', 'checkedAt', 'reliabilityLevel', 'usedFor', 'refreshFrequency'];
  const allowedReliability = new Set(['officielle', 'plateforme', 'émetteur', 'pédagogique']);
  for (const id of duplicates(sources.map((source) => source.id))) fail(`Sources: id dupliqué: "${id}".`);

  for (const source of sources) {
    for (const field of required) assertNonEmpty(source[field], `Sources: champ "${field}" manquant ou vide pour "${source.id || source.title || 'source inconnue'}".`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.checkedAt ?? '')) fail(`Sources: checkedAt invalide pour "${source.id}": "${source.checkedAt}".`);
    if (!allowedReliability.has(source.reliabilityLevel)) fail(`Sources: reliabilityLevel invalide pour "${source.id}": "${source.reliabilityLevel}".`);
  }
}

function verifyAllocations() {
  const officialTotals = [50, 75, 100, 150, 200, 300, 500, 1000];
  const totals = new Set(allocations.map((allocation) => allocation.total));
  for (const total of officialTotals) {
    if (!totals.has(total)) fail(`Allocations: montant officiel manquant: ${total}.`);
  }

  for (const allocation of allocations) {
    const values = ['total', 'etfMonde', 'bitcoin', 'ethereum', 'etfPercentage', 'bitcoinPercentage', 'ethereumPercentage'];
    for (const key of values) {
      if (typeof allocation[key] !== 'number' || Number.isNaN(allocation[key])) fail(`Allocations: valeur numérique invalide "${key}" pour total ${allocation.total}.`);
      if (allocation[key] < 0) fail(`Allocations: montant négatif "${key}" pour total ${allocation.total}.`);
    }
    const sum = allocation.etfMonde + allocation.bitcoin + allocation.ethereum;
    if (sum !== allocation.total) fail(`Allocations: total ${allocation.total} incohérent, somme=${sum}.`);
    const percentSum = allocation.etfPercentage + allocation.bitcoinPercentage + allocation.ethereumPercentage;
    if (Math.abs(percentSum - 100) > 0.2) fail(`Allocations: pourcentages incohérents pour total ${allocation.total}, somme=${percentSum}%.`);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function verifyInternalLinks() {
  const files = ['src/pages', 'src/content/pages', 'src/components'].flatMap((dir) => walk(fromRoot(dir))).filter((file) => /\.(astro|md|ts|tsx|js|jsx)$/.test(file));
  const patterns = [
    { name: 'HTML href root-relative', regex: /href=["']\/(?!\/|#)([^"']*)["']/g },
    { name: 'Markdown link root-relative', regex: /\]\(\/(?!\/|#)([^)]+)\)/g },
  ];
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    for (const { name, regex } of patterns) {
      for (const match of content.matchAll(regex)) fail(`Liens internes: ${name} dangereux dans ${rel(file)}: /${match[1]}`);
    }
  }
}

function verifyWorkflow() {
  const workflow = read('.github/workflows/deploy.yml');
  if (workflow.includes('enablement: true')) fail('Workflow: .github/workflows/deploy.yml contient encore "enablement: true".');
  if (!workflow.includes('npm run build')) fail('Workflow: npm run build est absent de deploy.yml.');
  if (!workflow.includes('npm run test')) fail('Workflow: npm run test est absent de deploy.yml.');
}

verifyNavigation();
verifySitePages();
verifySources();
verifyAllocations();
verifyInternalLinks();
verifyWorkflow();

for (const warning of warnings) console.warn(`⚠️  ${warning}`);
if (errors.length > 0) {
  console.error(`❌ Contrôle qualité du site échoué (${errors.length} erreur${errors.length > 1 ? 's' : ''}) :`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('✅ Contrôle qualité du site réussi.');
