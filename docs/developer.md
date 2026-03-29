# Developer documentation #

This documentation will help you to understand Tranquilpeak Hugo theme code.

If you want to report a bug or ask a question, [create an issue](https://github.com/petems/hugo-tranquilpeak-4000-theme/issues/new).

## Summary ##

- [General](#general)
- [Requirements](#requirements)
- [Installation](#installation)
- [Code style](#code-style)
- [Code structure](#code-structure)
- [Views](#views)
- [Assets](#assets)
    - [Stylesheets](#stylesheets)
    - [Images](#images)
    - [Javascript](#javascript)
- [NPM scripts](#npm-scripts)
- [Asset pipeline](#asset-pipeline)
- [Build](#build)
- [Development environment](#development-environment)
- [Production environment (before deploying your blog)](#production-environment-before-deploying-your-blog)
- [Running](#running)

## General ##

- **Author**: Thibaud Leprêtre
- **Version**: 4000.0.0
- **Compatibility**: Hugo v0.140+

## Requirements ##

1. **Hugo** : v0.140 or higher, see official documentation (https://gohugo.io/overview/installing/)
2. **Node.js** : v20 or higher

## Installation ##

1. Run `git clone https://github.com/petems/hugo-tranquilpeak-4000-theme.git`
2. Keep the local folder name as `hugo-tranquilpeak-theme-4000` and place it in the `themes` folder of your Hugo site
3. Modify the Hugo config by setting `theme = "hugo-tranquilpeak-theme-4000"`
4. Go into `themes/hugo-tranquilpeak-theme-4000`
5. Install [requirements](#requirements)
6. Run `npm install` to install [NPM dependencies](#npm-dependencies)

If you want to configure the theme, please follow the [user documentation](https://github.com/petems/hugo-tranquilpeak-4000-theme/blob/main/docs/user.md)

## Code style ##

We use [ESLint](http://eslint.org) based on Google code style to maintain javascript code style.
Check code style with :
``` bash
npm run lint
```

## Code structure ##

```
tranquilpeak
├── docs
├── layout
├── src
├── scripts
└── tasks
```

|File/Folder|Description|
|---|---|
|**docs**|Contains user and developer documentation|
|**layout**|Contains all views|
|**src**|Contains all assets (css, js and images)|
|**scripts**|Contains the modern build tooling entrypoints|
|**tasks**|Legacy Grunt task files kept for reference during migration|

<!--### Languages ###

Each files contains all labels used in the theme.
If you want to add a new language, duplicate an existing language file and replace all string by their translation.-->

### Views

```
├── layout
    ├── partials
    │   ├── post
    │   ...
    ...
...
```
|Folder|Description|
|---|---|
|layout|Contails all mains views|
|layout/partial|Contains all partial views included in main views|
|layout/partial/post|Contains all partial views to build post|

### Assets

#### Stylesheets

SCSS structure follow 7-1 pattern of [sass guidelines](http://sass-guidelin.es/#the-7-1-pattern)
If you want more information and to understand better this code, consult [sass guidelines](http://sass-guidelin.es/)

#### Images

```
├── images
    └── cover.jpg
```
|File|Description|
|---|---|
|cover.png|Default background cover of the blog|

Contains all images of the theme.

#### Javascript

```
├── js
    ├── .eslintrc.json
    ├── about.js
    ├── archives-filter.js
    ├── categories-filter.js
    ├── codeblock-resizer.js
    ├── fancybox.js
    ├── header.js
    ├── image-gallery.js
    ├── post-bottom-bar.js
    ├── share-options.js
    ├── sidebar.js
    ├── smartresize.js
    ├── tabbed-codeblocks.js
    └── tags-filter.js
```
|File|Description|
|---|---|
|about.js|Fade out the blog and let drop the about card of the author and vice versa|
|archives-filter.js|Filter posts by using their date on archives page : `/archives`|
|categories-filter.js|Filter posts by using their categories on archives page : `/categories`|
|codeblock-resizer.js|Resize code blocks to fit the screen width|
|fancybox.js.js|Run Fancybox plugin|
|header.js|Hide the header when the user scrolls down, and show it when he scrolls up|
|image-gallery.js|Resize all images of an image-gallery|
|post-bottom-bar.js|Hide the post bottom bar when the post footer is visible by the user, and vice versa|
|share-options.js|Open and close the share-options bar|
|sidebar.js|Open and close the sidebar by swiping the sidebar and the blog and vice versa|
|smartresize.js|Debouncing function from [John Hann](https://github.com/unscriptable)|
|tabbed-codeblocks.js|Animate tabs of tabbed code blocks|
|tags-filter.js|Filter posts by using their tags on archives page : `/tags`|

Each file correspond to a feature.

## NPM scripts

Use `npm run <script_name>` to run one of these scripts. E.g : `npm run start`

|`npm run ...`|Description|
|---|---|
|`start`|Alias for `npm run dev`|
|`dev`|Watch JS and SCSS files and rebuild hashed production assets after each change|
|`build`|Build hashed production assets and update template references|
|`prod`|Alias for `npm run build`|
|`lint`|Check code style with [ESLint](http://eslint.org)|

## Asset pipeline ##

Assets are now built by [build-assets.js](https://github.com/petems/hugo-tranquilpeak-4000-theme/blob/main/scripts/build-assets.js).

The pipeline does three things:

1. Concatenate and minify all files in `src/js/` with `esbuild`
2. Compile `src/scss/tranquilpeak.scss` with `sass`
3. Write hashed asset filenames into [head.html](https://github.com/petems/hugo-tranquilpeak-4000-theme/blob/main/layouts/partials/head.html) and [script.html](https://github.com/petems/hugo-tranquilpeak-4000-theme/blob/main/layouts/partials/script.html)

Generated files are written to `static/css/` and `static/js/`.

## Build ##

### Development environment

1. Run `npm run dev`
2. Run `hugo server`

### Production environment (before deploying your blog)

1. Run `npm run build`
2. Run `hugo --minify`

## Running ##

Run `hugo server` and start coding! :)
