# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **hugo-tranquilpeak-theme-4000**, a maintained fork of the original hugo-tranquilpeak-theme. The original theme (by kakawait) was a port of the Hexo Tranquilpeak theme to Hugo but has not been actively maintained.

### Fork Goals

This fork aims to:
1. **Preserve and continue**: Pick up community fixes and improvements from the original repository
2. **Modernize**: Update compatibility from Hugo v0.53 to modern Hugo versions (✅ Tested with v0.152.2)
3. **Enhance**: Add new features while maintaining the elegant design philosophy

### Compatibility Status

- **Original**: Hugo v0.53
- **Tested**: ✅ Hugo v0.152.2 (January 2026)
- **CI Testing**: Automated testing against Hugo versions 0.80.0-0.152.2
- **Known Issues**: See [HUGO_COMPATIBILITY_TEST.md](HUGO_COMPATIBILITY_TEST.md) for detailed compatibility report and migration guide

### Technical Stack

The theme is built using Grunt for asset compilation and uses SCSS following the 7-1 pattern from Sass Guidelines.

## Development Commands

### Building and Development

- `npm install` - Install dependencies (must be run after cloning)
- `npm run start` - Build theme and watch for changes (development mode)
- `npm run prod` - Build theme for production with optimization (concat, minify)
- `npm run lint` - Check JavaScript code style with ESLint (Google code style)

### Hugo Commands

- `hugo server` - Start Hugo development server to preview the theme

### Important Build Notes

- Development builds link individual CSS/JS files to views
- Production builds concatenate and minify all assets into single files
- The build process generates `static/` folder contents from `src/` folder
- Assets are synchronized from `src/` to `static/` during builds

## Architecture

### Directory Structure

```
├── layouts/          # Hugo template files (views)
│   ├── _default/     # Default layouts (list, single, baseof)
│   ├── partials/     # Reusable template components
│   ├── shortcodes/   # Hugo shortcodes
│   └── taxonomy/     # Tag/category archive pages
├── src/              # Source assets (pre-build)
│   ├── scss/         # SCSS stylesheets (7-1 pattern)
│   ├── js/           # JavaScript source files
│   └── images/       # Source images
├── static/           # Generated assets (output from build)
│   ├── css/          # Compiled CSS
│   ├── js/           # Compiled/concatenated JS
│   └── images/       # Synchronized images
├── tasks/            # Grunt task definitions
│   ├── config/       # Individual Grunt task configs
│   ├── register/     # Composite task definitions
│   └── pipeline.js   # Asset injection configuration
├── i18n/             # Internationalization files
├── archetypes/       # Hugo content templates
└── exampleSite/      # Example site configuration
```

### Asset Pipeline

The asset pipeline is managed by Grunt and defined in `tasks/pipeline.js`:

1. **SCSS Compilation**: `src/scss/tranquilpeak.scss` → `static/css/tranquilpeak.css`
2. **JS Concatenation**: Individual JS files → `static/js/tranquilpeak.js`
3. **Production Optimization**: Minification and concatenation of all assets
4. **Asset Injection**: `sails-linker` injects asset references into templates

Asset files listed in `tasks/pipeline.js` are injected into:
- CSS files → `layouts/partials/head.html`
- JS files → `layouts/partials/script.html`

### Key JavaScript Modules

Each JS file in `src/js/` implements a specific feature:
- `sidebar.js` - Sidebar open/close with swipe gestures
- `header.js` - Auto-hide header on scroll down, show on scroll up
- `about.js` - About card animation
- `fancybox.js` - Image lightbox functionality
- `image-gallery.js` - Image gallery resizing
- `codeblock-resizer.js` - Code block width adjustment
- `tabbed-codeblocks.js` - Tabbed code block animations
- `post-bottom-bar.js` - Post bottom bar visibility control
- `share-options.js` - Share options bar toggle
- `*-filter.js` - Archive/category/tag post filtering

### SCSS Architecture

Follows the 7-1 pattern (see Sass Guidelines):
- Organized into `base/`, `components/`, `layout/`, `pages/`, `themes/`, `utils/`, `vendor/`
- Main entry point: `src/scss/tranquilpeak.scss`

### Hugo Template Structure

- `layouts/index.html` - Homepage template
- `layouts/_default/baseof.html` - Base template (if exists)
- `layouts/_default/single.html` - Single post template
- `layouts/_default/list.html` - List/archive template
- `layouts/partials/` - Reusable components (header, footer, sidebar, post components)
- `layouts/taxonomy/` - Category and tag pages

## Configuration

Theme configuration is in the user's Hugo `config.toml`. See `exampleSite/config.toml` for all available options including:
- Sidebar configuration
- Social links
- Cover images
- Author information
- Integration with Disqus, Google Analytics, etc.

## Code Style

- JavaScript follows ESLint with Google code style configuration
- ESLint config: `src/js/.eslintrc.json` and root `.eslintrc`
- Always run `npm run lint` before committing JS changes

## Working with This Fork

Since this is hugo-tranquilpeak-theme-4000 (a maintained fork):
- When making changes, prioritize compatibility with modern Hugo versions
- Consider backward compatibility where feasible, but prioritize moving forward
- Document breaking changes clearly for users migrating from the original theme
- Look for outstanding issues/PRs in the original repository that could be merged here

### Applied Hugo Compatibility Fixes

1. **Google Analytics Template** (layouts/partials/head.html:line 61-65)
   - Removed references to deprecated `_internal/google_analytics_async.html`
   - Now uses single `_internal/google_analytics.html` template (Hugo v0.128.0+ compatible)

2. **Configuration Updates Required for Users**
   - `paginate = 7` → `[pagination] pagerSize = 7` (Hugo v0.128.0+)
   - Users must update their site config when upgrading

See HUGO_COMPATIBILITY_TEST.md for complete list of changes and migration guide.

## Continuous Integration

### GitHub Actions Workflow

The repository includes automated compatibility testing via `.github/workflows/hugo-compatibility.yml`:

- **Triggers**: Pushes to master/main/develop, pull requests, manual dispatch
- **Test Matrix**: Hugo versions 0.80.0 through 0.152.2
- **Strategy**: fail-fast disabled to test all versions even if one fails
- **Steps**:
  1. Checkout theme code
  2. Install Node.js and npm dependencies
  3. Build theme assets with Grunt (`npm run prod`)
  4. Install specific Hugo version
  5. Create test site and link theme
  6. Copy example content
  7. Configure site with modern syntax
  8. Build Hugo site with `--minify --verbose`
  9. Verify output (public/ directory and index.html exist)
  10. Upload artifacts on failure for debugging

### Running Tests Locally

To replicate the CI test locally:

```bash
# Build the theme
npm ci
npm run prod

# Create a test site
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

# Build
hugo --minify --verbose
```

### Adding New Hugo Versions

To test against new Hugo versions, edit `.github/workflows/hugo-compatibility.yml` and add to the matrix:

```yaml
matrix:
  hugo-version:
    - '0.160.0'  # Add new version here
    - '0.152.2'
    # ... existing versions
```

## Testing

This theme has no automated tests. Manual testing requires:
1. Building the theme: `npm run prod`
2. Running Hugo: `hugo server` in a Hugo site that uses this theme
3. Testing in browser

Use `exampleSite/` as a test site by running `hugo server` from within that directory.
