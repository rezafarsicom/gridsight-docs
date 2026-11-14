// Checks that every relative Markdown link in this repository resolves to a file
// that exists. No dependencies, no network: it reads the working tree only.
//   node scripts/check-links.mjs
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const ignored = new Set(['.git', 'node_modules']);
const files = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else files.push(full);
  }
}
await walk(root);

const markdown = files.filter((f) => f.endsWith('.md'));
const problems = [];
let checked = 0;

for (const file of markdown) {
  const text = await readFile(file, 'utf8');
  const rel = path.relative(root, file);

  for (const match of text.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    checked++;

    const clean = decodeURIComponent(target.split('#')[0]);
    if (!clean) continue;

    const resolved = path.resolve(path.dirname(file), clean);
    if (!resolved.startsWith(root)) {
      problems.push(`${rel}: link leaves the repository -> ${target}`);
      continue;
    }
    try {
      await stat(resolved);
    } catch {
      problems.push(`${rel}: missing target -> ${target}`);
    }
  }

  // Anchors inside the same file are only checked for shape.
  for (const match of text.matchAll(/\]\(#([^)]+)\)/g)) {
    if (!/^[a-z0-9-]+$/.test(match[1])) problems.push(`${rel}: unusual anchor -> #${match[1]}`);
  }
}

if (problems.length) {
  console.error(`Link check failed (${problems.length}):`);
  for (const problem of problems) console.error('  ' + problem);
  process.exit(1);
}

console.log(`Link check passed: ${checked} relative links across ${markdown.length} Markdown files.`);
