'use strict';
const fs = require('fs');
const cpx = require('cpx');
const ejs = require('ejs');
const path = require('path');
const config = require('./app.config');

const BUILD_DIR_NAME = 'public';
const ASSETS_DIR_NAME = 'assets';
const THEMES_DIR_NAME = 'css/theme';
const TEMPLATES_DIR_NAME = 'templates';
const PRESENTATIONS_DIR_NAME = 'presentations';

const DEFAULT_TEMPLATE = 'template';
const DEFAULT_THEME = 'simple';

const JS_FILES = [
    'lib/js/head.min.js',
    'js/reveal.js',
];
const CSS_FILES = [
    'css/reveal.css',
    'lib/css/zenburn.css',
];
const FILE_PATH_DIRECTORY_SEPARATOR = '/';

// actual program is here
// ===

const args = process.argv.slice(2);
const VERBOSE = args.indexOf('-s') === -1 && args.indexOf('--silent') === -1;

generatePresentations();
copyStaticAssets();

// ===

function generatePresentations() {
    if (VERBOSE) {
        console.log(`Creating presentations`);
    }

    const buildDirectoryPath = path.join(__dirname, BUILD_DIR_NAME);
    if (!fs.existsSync(buildDirectoryPath)) {
        fs.mkdirSync(buildDirectoryPath);
    }

    let presentationsCreated = [];

    config.presentations.forEach(presentationConfig => {
        const presentationFilePath = path.join(__dirname, PRESENTATIONS_DIR_NAME, presentationConfig.file);

        if (isFile(presentationFilePath)) {
            if (VERBOSE) {
                console.log(`Generating presentation ${presentationConfig.file} (${presentationFilePath})...`);
            }
            
            const presentationContent = generatePresentationContent(presentationConfig);
            
            fs.writeFileSync(path.join(buildDirectoryPath, presentationConfig.file), presentationContent);

            presentationsCreated.push(presentationConfig);
            
            if (VERBOSE) {
                console.log('Done');
            }
        }
    });
}

function generatePresentationContent(presentationConfig) {
    const presentationFilePath = path.join(__dirname, PRESENTATIONS_DIR_NAME, presentationConfig.file);

    let slidesContent = fs.readFileSync(presentationFilePath).toString();

    const themeFileName = presentationConfig.hasOwnProperty('theme') && presentationConfig.theme
        ? presentationConfig.theme
        : DEFAULT_THEME;

    const themeFilePath = `${path.join(__dirname, THEMES_DIR_NAME, themeFileName)}.css`;
    if (!isFile(themeFilePath)) {
        throw new Error(`Cannot find theme ${themeFilePath}`);
    }

    const jsFiles = [...JS_FILES];
    const cssFiles = [...CSS_FILES, `${THEMES_DIR_NAME}${FILE_PATH_DIRECTORY_SEPARATOR}${themeFileName}.css`];

    const templateArgs = {
        config,
        title: presentationConfig.title,
        slides: slidesContent,
        jsFiles,
        cssFiles,
        theme: presentationConfig.theme,
    };

    const templateFileName = presentationConfig.hasOwnProperty('template') && presentationConfig.template
        ? presentationConfig.template
        : DEFAULT_TEMPLATE;

    const templateFilePath = `${path.join(__dirname, TEMPLATES_DIR_NAME, templateFileName)}.ejs`;
    if (!isFile(templateFilePath)) {
        throw new Error(`Cannot find template ${templateFilePath}`);
    }

    const template = fs.readFileSync(templateFilePath).toString();

    return ejs.render(template, templateArgs);
}

function isFile(filePath) {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

function copyStaticAssets() {
    const buildDirectoryPath = path.join(__dirname, BUILD_DIR_NAME);
    const assetsDirectoryPath = path.join(__dirname, ASSETS_DIR_NAME);
    const themesDirectoryPath = path.join(__dirname, THEMES_DIR_NAME);

    const globsToCopy = [
        ...[...JS_FILES, ...CSS_FILES].map(file => ({
            from: path.join(__dirname, file),
            to: path.join(
                buildDirectoryPath,
                file
                    .split(FILE_PATH_DIRECTORY_SEPARATOR)
                    .slice(0, -1)
                    .join(FILE_PATH_DIRECTORY_SEPARATOR)
            ),
        })),
        {
            from: path.join(assetsDirectoryPath, '**', '*'),
            to: path.join(buildDirectoryPath, ASSETS_DIR_NAME),
        },
        {
            from: path.join(themesDirectoryPath, '**', '*'),
            to: path.join(buildDirectoryPath, THEMES_DIR_NAME),
        },
    ];

    globsToCopy.forEach(glob => {
        cpx.copySync(glob.from, glob.to);
    });
}
