#!/usr/bin/env node
// Copies this project (code only) into a new folder, so your own films never touch the installed skill.
//   npm run new -- ~/Desktop/my-film
// Then: cd ~/Desktop/my-film && npm install
import { cpSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dest = process.argv[2];
if (!dest) { console.error("Usage: npm run new -- <folder>"); process.exit(2); }
const target = path.resolve(dest.replace(/^~(?=$|\/|\\)/, process.env.HOME ?? process.env.USERPROFILE ?? "~"));
if (existsSync(target) && readdirSync(target).length) { console.error(`${target} already exists and isn't empty.`); process.exit(2); }

const skip = new Set(["node_modules", "out", "media", ".git", "SKILL.md"]);
cpSync(root, target, { recursive: true, filter: (src) => !skip.has(path.relative(root, src).split(path.sep)[0]) });
console.log(`Copied the project to ${target}\nNext:\n  cd "${target}"\n  npm install\n  npm run list`);
