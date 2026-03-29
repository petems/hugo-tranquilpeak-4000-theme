#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const sass = require('sass');
const esbuild = require('esbuild');

const ROOT = process.cwd();
const JS_SRC_DIR = path.join(ROOT, 'src', 'js');
const SCSS_ENTRY = path.join(ROOT, 'src', 'scss', 'tranquilpeak.scss');
const STATIC_JS_DIR = path.join(ROOT, 'static', 'js');
const STATIC_CSS_DIR = path.join(ROOT, 'static', 'css');
const SCRIPT_PARTIAL = path.join(ROOT, 'layouts', 'partials', 'script.html');
const HEAD_PARTIAL = path.join(ROOT, 'layouts', 'partials', 'head.html');

/**
 * Recursively collect files under a directory.
 * @param {string} dir
 * @return {string[]}
 */
function walkFiles(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out = out.concat(walkFiles(full));
      continue;
    }
    out.push(full);
  }
  return out;
}

/**
 * Create a stable content hash token for asset filenames.
 * @param {string|Buffer} content
 * @return {string}
 */
function sha256Token(content) {
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 60);
}

/**
 * Remove previously generated asset artifacts.
 * @return {void}
 */
function cleanOldBuildArtifacts() {
  const jsFiles = fs.existsSync(STATIC_JS_DIR) ? fs.readdirSync(STATIC_JS_DIR) : [];
  for (const file of jsFiles) {
    if (/^script-.*\.min\.js$/.test(file) || file === 'script.js' || file === 'tranquilpeak.js') {
      fs.unlinkSync(path.join(STATIC_JS_DIR, file));
    }
  }

  const cssFiles = fs.existsSync(STATIC_CSS_DIR) ? fs.readdirSync(STATIC_CSS_DIR) : [];
  for (const file of cssFiles) {
    if (/^style-.*\.min\.css$/.test(file) || file === 'style.css' || file === 'tranquilpeak.css') {
      fs.unlinkSync(path.join(STATIC_CSS_DIR, file));
    }
  }
}

/**
 * Concatenate and minify theme JavaScript.
 * @return {string}
 */
function buildJs() {
  const jsFiles = walkFiles(JS_SRC_DIR)
    .filter((filePath) => filePath.endsWith('.js') && !path.basename(filePath).startsWith('.'))
    .sort();

  const source = jsFiles.map((filePath) => fs.readFileSync(filePath, 'utf8')).join('\n;\n');
  const result = esbuild.transformSync(source, {
    loader: 'js',
    minify: true,
    target: 'es2018'
  });

  const token = sha256Token(result.code);
  const outputName = `script-${token}.min.js`;
  fs.writeFileSync(path.join(STATIC_JS_DIR, outputName), result.code);
  return outputName;
}

/**
 * Compile and minify the main stylesheet.
 * @return {string}
 */
function buildCss() {
  const result = sass.renderSync({
    file: SCSS_ENTRY,
    outputStyle: 'compressed'
  });
  const css = result.css.toString();
  const token = sha256Token(css);
  const outputName = `style-${token}.min.css`;
  fs.writeFileSync(path.join(STATIC_CSS_DIR, outputName), css);
  return outputName;
}

/**
 * Replace generated asset references inside a tagged block.
 * @param {string} filePath
 * @param {string} startTag
 * @param {string} endTag
 * @param {string} replacementLine
 * @return {void}
 */
function replaceBetweenTags(filePath, startTag, endTag, replacementLine) {
  const original = fs.readFileSync(filePath, 'utf8');
  const matcher = new RegExp(`(${startTag})([\\s\\S]*?)(${endTag})`);
  const updated = original.replace(matcher, `$1\n${replacementLine}\n$3`);
  fs.writeFileSync(filePath, updated);
}

/**
 * Build all theme assets and rewrite template references.
 * @return {void}
 */
function main() {
  cleanOldBuildArtifacts();

  const jsFile = buildJs();
  const cssFile = buildCss();

  replaceBetweenTags(
    SCRIPT_PARTIAL,
    '<!--SCRIPTS-->',
    '<!--SCRIPTS END-->',
    `<script src="{{ \"/js/${jsFile}\" | absURL }}"></script>`
  );
  replaceBetweenTags(
    HEAD_PARTIAL,
    '<!--STYLES-->',
    '<!--STYLES END-->',
    `<link rel="stylesheet" href="{{ \"css/${cssFile}\" | absURL }}" />`
  );

  console.log(`Built assets: ${cssFile}, ${jsFile}`);
}

main();
