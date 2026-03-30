# Tranquilpeak 4000

[![Hugo Compatibility Test](https://github.com/petems/hugo-tranquilpeak-4000-theme/actions/workflows/hugo-compatibility.yml/badge.svg)](https://github.com/petems/hugo-tranquilpeak-4000-theme/actions/workflows/hugo-compatibility.yml)
[![Twitter Follow](https://img.shields.io/twitter/follow/thibaudlepretre.svg?style=social&label=%40thibaudlepretre)](https://twitter.com/intent/follow?screen_name=thibaudlepretre)

A gorgeous responsive theme for Hugo blog framework.

![Tranquilpeak](https://raw.githubusercontent.com/petems/hugo-tranquilpeak-4000-theme/main/showcase.png)

## About This Fork

**hugo-tranquilpeak-theme-4000** is a maintained fork of the original [hugo-tranquilpeak-theme](https://github.com/kakawait/hugo-tranquilpeak-theme) by kakawait. This fork aims to:

- **Keep the theme alive**: Pick up community fixes and improvements from the original repository
- **Modernize**: Update to support modern Hugo versions (beyond the original v0.53 compatibility)
- **Enhance**: Add new features and capabilities while maintaining the elegant design

The original theme has not been actively maintained, so this fork serves as a continuation of the project for users who want to use Tranquilpeak with current Hugo versions.

## Alpha/Beta versions

**ATTENTION** during *alpha* or *beta* [versions](https://github.com/petems/hugo-tranquilpeak-4000-theme/milestones) breaking changes are possible on config file.

You can track [breaking changes label](https://github.com/petems/hugo-tranquilpeak-4000-theme/issues?q=is%3Aissue+is%3Aopen+label%3A%22breaking+changes%22).

How can I migrate my current version? Please read [CHANGELOG.md](https://github.com/petems/hugo-tranquilpeak-4000-theme/blob/main/CHANGELOG.md).

## Summary

- [General](#general)
- [Hugo Version Compatibility](#hugo-version-compatibility)
- [Features](#features)
- [Quick start](#quick-start)
- [Demo](#demo)
- [Documentation](#documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [Showcase](#showcase)
- [License](#license)

## General

- **Original Authors**: [Thibaud Leprêtre (kakawait)](https://github.com/kakawait) and [Louis Barranqueiro (LouisBarranqueiro)](https://github.com/LouisBarranqueiro)
- **Fork Maintainer**: hugo-tranquilpeak-theme-4000 community
- **Version**: 4000.0.0
- **Original Compatibility**: Hugo v0.53
- **Current Compatibility**: ✅ Hugo v0.140.0+

## Hugo Version Compatibility

| Hugo Version Range | Status | Notes |
|-------------------|--------|-------|
| **v0.155.x** | ✅ Tested | Latest tested version |
| **v0.140.0 - v0.154.x** | ✅ Tested | Supported compatibility window |
| **v0.128.0 - v0.139.x** | ⚠️ Unsupported | Below maintained floor for this fork |
| **v0.110.0 - v0.127.x** | ⚠️ Unsupported | Below maintained floor for this fork |
| **v0.53.0 - v0.109.x** | ⚠️ Unsupported | Original range, no longer maintained here |
| **< v0.53.0** | ❌ Not Supported | Pre-release compatibility unknown |

**Legend:**
- ✅ **Tested** - Verified working in automated CI tests
- ⚠️ **Untested** - Not tested in CI, compatibility unknown
- ❌ **Not Supported** - Known issues or untested older versions

See [HUGO_COMPATIBILITY_TEST.md](HUGO_COMPATIBILITY_TEST.md) for detailed test results and migration guide.

## Features

**General features:**

- Fully responsive
- Optimized for tablets & mobiles
- Configurable menu of the sidebar
- Pages to filter tags, categories and archives
- Background cover image
- Beautiful about page
- Support Open Graph protocol
- Easily customizable (fonts, colors, layout elements, code coloration, etc..)
- Support internationalization (i18)

**Posts features:**

- Thumbnail image
- Cover image
- Responsive videos & images
- Sharing options
- Navigation menu
- GitHub theme for code highlighting (customizable)
- Image gallery
- Tags for images (FancyBox), wide images, tabbed code blocks, highlighted text, alerts
- Table of contents

**Integrated services:**

- Disqus
- Gitlak
- Google analytics
- Gravatar
- Facebook Insights

### Missing features from original *Hexo* version

- [ ] Algolia (https://github.com/petems/hugo-tranquilpeak-4000-theme/issues/8)
- [ ] Pagination customization `tagPagination`, `categoryPagination` and `archivePagination` (https://github.com/petems/hugo-tranquilpeak-4000-theme/issues/17)

**ATTENTION** following features will not be possible due to *Hugo* limitations

- Archives pages by years `/archives/2015`
- Archives pages by month `/archives/2015/01`

## Quick start

**Please read [user documentation](https://github.com/petems/hugo-tranquilpeak-4000-theme/blob/main/docs/user.md), it's short and useful to discover all features and possibilities of the theme, especially the  [writing posts](https://github.com/petems/hugo-tranquilpeak-4000-theme/blob/main/docs/user.md#writing-posts) section**

### For people who want to use the original version of Tranquilpeak without modifications (users)

Go to the directory where you have your Hugo site and run:

```shell
mkdir themes
cd themes
git clone https://github.com/petems/hugo-tranquilpeak-4000-theme.git
```

After installing the Tranquilpeak theme successfully, we recommend you to take a look at the [exampleSite](exampleSite) directory. You will find a working Hugo site configured with the Tranquilpeak theme that you can use as a starting point for your site.

First, let's take a look at the [config.toml](exampleSite/config.toml). It will be useful to learn how to customize your site. Feel free to play around with the settings.

More information on [user documentation](https://github.com/petems/hugo-tranquilpeak-4000-theme/blob/main/docs/user.md) to install and configure the theme

### For people who want to create their own version of tranquilpeak (developers)

1. Run `git clone https://github.com/petems/hugo-tranquilpeak-4000-theme.git`
2. Follow [developer documentation](https://github.com/petems/hugo-tranquilpeak-4000-theme/blob/main/docs/developer.md) to edit and build the theme

## Demo

Run the demo locally from this repo:

```shell
hugo server --source exampleSite
```

## Showcase

Checkout showcase in `exampleSite/content/posts/Who-is-using-Tranquilpeak-Hugo-Theme.md`

### How can I add my site to the showcase

**Click [here](https://github.com/petems/hugo-tranquilpeak-4000-theme/issues/new?title=Add%20my%20blog%20into%20the%20showcase&body=Hey,%20add%20my%20blog%20into%20the%20showcase:) to add your blog into the showcase.**

Please fill the following information:

1. public url
2. name (optional)
3. description (optional)

## Documentation

If it's your first time using Hugo, please check [Hugo official documentation](https://gohugo.io/overview/introduction/)

### For users

To install and configure the theme, consult the following documentation : [user documentation](https://github.com/petems/hugo-tranquilpeak-4000-theme/blob/main/docs/user.md)

### For developers

To understand the code, the workflow and edit the theme, consult the following documentation : [developer documentation](https://github.com/petems/hugo-tranquilpeak-4000-theme/blob/main/docs/developer.md)

## Testing

This fork includes automated compatibility testing against multiple Hugo versions via GitHub Actions.

**Tested Hugo Versions:**
- 0.140.0 through latest stable (CI tested)
- Additional versions tested on-demand

**CI Status:** Check the badge at the top of this README for current build status.

**For detailed compatibility information:** See [HUGO_COMPATIBILITY_TEST.md](HUGO_COMPATIBILITY_TEST.md)

## Vercel Deployment

This repository includes a Vercel-oriented build flow for deploying `exampleSite` with the local theme source.

### Files

- `build.sh`: Reproduces the deploy-relevant CI steps (asset build + Hugo build) and sets baseURL for preview and production.
- `vercel.json`: Pins Vercel build settings to use `build.sh` and output `public`.

### Theme name used in Vercel build

The Vercel build uses the local theme name `hugo-tranquilpeak-4000-theme`.

### Vercel project settings

1. Framework Preset: `Hugo`
2. Install Command: `npm ci`
3. Build Command: `bash ./build.sh`
4. Output Directory: `public`
5. Ensure system environment variables are exposed (`VERCEL_ENV`, `VERCEL_URL`, `VERCEL_PROJECT_PRODUCTION_URL`).

## Contributing

All kinds of contributions (enhancements, features, documentation & code improvements, bugs reporting) are welcome.

Read [guidelines for contributing](https://github.com/petems/hugo-tranquilpeak-4000-theme/blob/main/.github/CONTRIBUTING.md) for more information.

## Credits

*Hugo* version of Tranquilpeak is based on the original *Hexo* version https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak. The Hugo port was created by [kakawait](https://github.com/kakawait).

This **hugo-tranquilpeak-theme-4000** fork is maintained by the community to continue development and provide compatibility with modern Hugo versions.

## License

hugo-tranquilpeak-theme-4000 is released under the terms of the [GNU General Public License v3.0](https://github.com/petems/hugo-tranquilpeak-4000-theme/blob/main/LICENSE).
