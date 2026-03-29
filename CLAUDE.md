# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **hugo-tranquilpeak-theme-4000**, a maintained fork of the original hugo-tranquilpeak-theme. The original theme (by kakawait) was a port of the Hexo Tranquilpeak theme to Hugo but has not been actively maintained.

### Fork Goals

This fork aims to:
1. **Preserve and continue**: Pick up community fixes and improvements from the original repository
2. **Modernize**: Update compatibility from Hugo v0.53 to modern Hugo versions (✅ Minimum v0.140.0 required)
3. **Enhance**: Add new features while maintaining the elegant design philosophy

### Compatibility Status

- **Original**: Hugo v0.53
- **Minimum Required**: Hugo v0.140.0
- **Tested**: ✅ Hugo v0.155.3+ (March 2026)
- **CI Testing**: Automated testing against Hugo versions 0.140.0-0.155.3+
- **Known Issues**: See [HUGO_COMPATIBILITY_TEST.md](HUGO_COMPATIBILITY_TEST.md) for detailed compatibility report and migration guide

### Technical Stack

The theme uses **Hugo Pipes** for all asset processing (SCSS compilation, JS concatenation, minification, fingerprinting). No external build tools (Grunt, Webpack, etc.) are required. JavaScript is vanilla JS (no jQuery dependency). SCSS follows the 7-1 pattern from Sass Guidelines.

## Development Commands

### Hugo Commands

- `hugo server` - Start Hugo development server to preview the theme
- `hugo --minify` - Build the site for production (Hugo Pipes handles all asset optimization)

### Linting

- `npm install` - Install Biome (only needed for linting)
- `npm run lint` - Check JavaScript code style and formatting with Biome
- `npm run lint:fix` - Auto-fix lint and formatting issues
- `npm run format` - Format JavaScript files

### Important Build Notes

- **No external build step required** -- Hugo Pipes handles SCSS compilation, JS bundling, minification, and fingerprinting
- In development mode (`hugo server`), assets are served unminified
- In production mode (`hugo --minify` or `HUGO_ENVIRONMENT=production`), assets are minified and fingerprinted
- Hugo **extended version** is required (for SCSS compilation)

## Architecture

### Directory Structure

```
├── layouts/          # Hugo template files (views)
│   ├── _default/     # Default layouts (list, single, baseof)
│   ├── partials/     # Reusable template components
│   ├── shortcodes/   # Hugo shortcodes
│   └── taxonomy/     # Tag/category archive pages
├── assets/           # Source assets (processed by Hugo Pipes)
│   ├── scss/         # SCSS stylesheets (7-1 pattern)
│   ├── js/           # JavaScript source files (vanilla JS)
│   └── images/       # Theme images
├── i18n/             # Internationalization files
├── archetypes/       # Hugo content templates
└── exampleSite/      # Example site configuration
```

### Asset Pipeline (Hugo Pipes)

Assets are processed entirely by Hugo Pipes, configured in template partials:

1. **SCSS Compilation**: `assets/scss/tranquilpeak.scss` → compiled via `toCSS` in `layouts/partials/head.html`
2. **JS Concatenation**: Individual JS files → concatenated via `resources.Concat` in `layouts/partials/script.html`
3. **Production Optimization**: `minify | fingerprint` applied when `hugo.IsProduction` is true
4. **Image Processing**: Page resource images get WebP variants and responsive srcsets via shortcodes

### Key JavaScript Modules

Each JS file in `assets/js/` implements a specific feature (vanilla JS, no jQuery):
- `sidebar.js` - Sidebar open/close with swipe gestures
- `header.js` - Auto-hide header on scroll down, show on scroll up
- `about.js` - About card animation (CSS transitions)
- `fancybox.js` - Image lightbox via GLightbox (replaces jQuery Fancybox)
- `image-gallery.js` - Image gallery resizing
- `codeblock-resizer.js` - Code block width adjustment
- `tabbed-codeblocks.js` - Tabbed code block animations
- `post-bottom-bar.js` - Post bottom bar visibility control
- `share-options.js` - Share options bar toggle
- `search-modal.js` - Algolia search modal
- `smartresize.js` - Debounced window resize utility
- `*-filter.js` - Archive/category/tag post filtering

### External Dependencies (CDN)

- **Font Awesome 5.15.3** - Icons
- **GLightbox 3.3.0** - Image lightbox (replaced jQuery Fancybox)
- **Highlight.js 11.1.0** or **Prism.js 1.24.1** - Syntax highlighting (configurable)
- **MathJax 2.7.4** - Math rendering (optional)
- **Moment.js 2.19.1** + **Algoliasearch 3.24.5** - Search (optional, requires Algolia config)

### SCSS Architecture

Follows the 7-1 pattern (see Sass Guidelines):
- Organized into `base/`, `components/`, `layout/`, `pages/`, `themes/`, `utils/`, `vendor/`
- Main entry point: `assets/scss/tranquilpeak.scss`

### Hugo Template Structure

- `layouts/index.html` - Homepage template
- `layouts/_default/single.html` - Single post template
- `layouts/_default/list.html` - List/archive template
- `layouts/partials/` - Reusable components (header, footer, sidebar, post components)
- `layouts/taxonomy/` - Category and tag pages

### Image Processing

The theme uses Hugo's built-in image processing for local page resources:
- **Shortcodes** (`image.html`, `wide-image.html`): Generate responsive `<picture>` elements with WebP sources and srcsets for page resources; external URLs pass through unchanged
- **Cover images** (`cover.html`): Theme cover images from `assets/images/` are served via Hugo resources with fingerprinting
- **Lazy loading**: All below-fold images use `loading="lazy"` and `decoding="async"`
- **Gallery images**: Lazy-loaded with GLightbox integration

## Configuration

Theme configuration is in the user's Hugo `config.toml`. See `exampleSite/config.toml` for all available options including:
- Sidebar configuration
- Social links
- Cover images
- Author information
- Integration with Disqus, Google Analytics, etc.

## Code Style

- JavaScript is linted and formatted with Biome
- Biome config: `biome.json` in the project root
- Always run `npm run lint` before committing JS changes

## Working with This Fork

Since this is hugo-tranquilpeak-theme-4000 (a maintained fork):
- When making changes, prioritize compatibility with modern Hugo versions
- Consider backward compatibility where feasible, but prioritize moving forward
- Document breaking changes clearly for users migrating from the original theme
- Look for outstanding issues/PRs in the original repository that could be merged here

### Applied Hugo Compatibility Fixes

1. **Google Analytics Template** (layouts/partials/head.html)
   - Removed references to deprecated `_internal/google_analytics_async.html`
   - Now uses single `_internal/google_analytics.html` template (Hugo v0.128.0+ compatible)

2. **Hugo Pipes Migration**
   - Replaced Grunt build system with Hugo Pipes for all asset processing
   - Removed jQuery dependency -- all JS is vanilla
   - Replaced Fancybox (jQuery plugin) with GLightbox (vanilla JS)
   - Added responsive image support with WebP variants for page resources

3. **Configuration Updates Required for Users**
   - `paginate = 7` → `[pagination] pagerSize = 7` (Hugo v0.128.0+)
   - Users must update their site config when upgrading

See HUGO_COMPATIBILITY_TEST.md for complete list of changes and migration guide.

## Continuous Integration

### GitHub Actions Workflow

The repository includes automated compatibility testing via `.github/workflows/hugo-compatibility.yml`:

- **Triggers**: Pushes to master/main/develop, pull requests, manual dispatch
- **Test Matrix**: Hugo versions 0.140.0, 0.145.0, 0.150.0, 0.155.3+
- **Strategy**: fail-fast disabled to test all versions even if one fails
- **Requires**: Hugo extended version (for SCSS compilation)
- **Steps**:
  1. Checkout theme code
  2. Install specific Hugo version (extended)
  3. Create test site and link theme
  4. Copy example content
  5. Configure site with modern syntax
  6. Build Hugo site with `--minify`
  7. Verify output (public/ directory and index.html exist)
  8. Upload artifacts on failure for debugging

### Running Tests Locally

To replicate the CI test locally:

```bash
# Create a test site (no npm build needed!)
cd ..
hugo new site test-site
cd test-site
mkdir -p themes
ln -s ../hugo-tranquilpeak-theme-4000 themes/

# Copy example content
cp -r ../hugo-tranquilpeak-theme-4000/exampleSite/content/* content/
cp -r ../hugo-tranquilpeak-theme-4000/exampleSite/static/* static/

# Create modern config
cat > hugo.toml <<EOF
baseURL = "https://example.org/"
theme = "hugo-tranquilpeak-theme-4000"
[pagination]
  pagerSize = 7
EOF

# Build (Hugo Pipes handles all asset compilation)
hugo --minify --verbose
```

### Adding New Hugo Versions

To test against new Hugo versions, edit `.github/workflows/hugo-compatibility.yml` and add to the matrix:

```yaml
matrix:
  hugo-version:
    - '0.160.0'  # Add new version here
    - '0.155.3'
    # ... existing versions
```

## Testing

This theme has no automated tests. Manual testing requires:
1. Running Hugo: `hugo server` in a Hugo site that uses this theme
2. Testing in browser
3. Verifying all interactive features (sidebar, lightbox, filters, etc.)

Use `exampleSite/` as a test site by running `hugo server` from within that directory.
