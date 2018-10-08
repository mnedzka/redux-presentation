'use strict';
const fs = require('fs');
const cpx = require('cpx');
const ejs = require('ejs');
const path = require('path');
const config = require('./app.config');


const ASSETS_DIR_NAME = 'assets';
const STATIC_DIR_NAME = 'static';
const PRESENTATIONS_DIR_NAME = 'presentations';
const GENERATED_PRESENTATIONS_SUB_DIR_NAME = 'generated';
const TEMPLATE_FILE_NAME = 'template.ejs';
const ENCODING = 'utf-8';

const JS_FILES = [
    'lib/js/head.min.js',
    'js/reveal.js',
];
const CSS_FILES = [
    'css/reveal.css',
    'lib/css/zenburn.css',
];
const FILE_PATH_DIRECTORY_SEPARATOR = '/';


const args = process.argv.slice(2);
const verbose = args.indexOf('-s') === -1 && args.indexOf('--silent') === -1;
const localhost = args.indexOf('-l') >= 0 || args.indexOf('--localhost') >= 0;
let themesUsed = [];


generateSlides(localhost);
if (!localhost) {
    generateStatic();
}


function generateSlides(localhost) {
    if (verbose) {
        console.log(`Creating ${localhost ? 'live' : 'static'} presentation`);
    }

    let jsFiles;
    let cssFiles;

    if (localhost) {
        jsFiles = JS_FILES.map(file => `/${file}`);
        cssFiles = CSS_FILES.map(file => `/${file}`);
    } else {
        jsFiles = [...JS_FILES];
        cssFiles = [...CSS_FILES];
    }

    const slidesPath = path.join(__dirname, PRESENTATIONS_DIR_NAME);

    config.presentations.forEach(presentation => {
        const filePath = path.join(slidesPath, presentation.file);

        if (fs.statSync(filePath).isFile()) {
            if (verbose) {
                console.log(`Generating slides for ${presentation.file} (${filePath})...`);
            }

            let slides = fs.readFileSync(filePath).toString();

            if (!localhost) {
                const assetsRegex = /="\/assets\//gi;
                slides = slides.replace(assetsRegex, '="assets/');
            }

            const themeFile = `css/theme/${presentation.theme}.css`;
            const localCssFiles = cssFiles.indexOf(themeFile) >= 0 ? cssFiles : [...cssFiles, `${localhost ? '/' : ''}${themeFile}`];

            if (themesUsed.indexOf(themeFile) === -1) {
                themesUsed.push(themeFile);
            }

            const template = fs.readFileSync(path.join(__dirname, TEMPLATE_FILE_NAME), ENCODING);
            const templateArgs = {
                title: presentation.title,
                slides,
                jsFiles,
                cssFiles: localCssFiles,
                localhost,
                theme: presentation.theme,
                revealConfig: JSON.stringify(config.reveal),
            };
            const htmlFileContent = ejs.render(template, templateArgs);

            const generatedSlidesPath = path.join(slidesPath, GENERATED_PRESENTATIONS_SUB_DIR_NAME);
            if (!fs.existsSync(generatedSlidesPath)) {
                fs.mkdirSync(generatedSlidesPath);
            }

            const destFile = presentation.hasOwnProperty('destFile') ? presentation.destFile : presentation.file;

            fs.writeFileSync(path.join(generatedSlidesPath, destFile), htmlFileContent);

            if (verbose) {
                console.log('Done');
            }
        }
    });
}

function generateStatic() {
    const generatedSlidesPath = path.join(__dirname, PRESENTATIONS_DIR_NAME, GENERATED_PRESENTATIONS_SUB_DIR_NAME);
    const staticPath = path.join(__dirname, STATIC_DIR_NAME);
    const assetsPath = path.join(__dirname, ASSETS_DIR_NAME);

    const globsToCopy = [
        ...[...JS_FILES, ...CSS_FILES, ...themesUsed].map(file => ({
            from: path.join(__dirname, file),
            to: path.join(staticPath, file
                .split(FILE_PATH_DIRECTORY_SEPARATOR)
                .slice(0, -1)
                .join(FILE_PATH_DIRECTORY_SEPARATOR)
            ),
        })),
        {
            from: path.join(generatedSlidesPath, '**', '*'),
            to: staticPath,
        },
        {
            from: path.join(assetsPath, '**', '*'),
            to: path.join(staticPath, ASSETS_DIR_NAME),
        },
    ];

    globsToCopy.forEach(glob => {
        if (verbose) {
            console.log(`Copying files from ${glob.from} to ${glob.to}...`);
        }

        cpx.copySync(glob.from, glob.to);

        if (verbose) {
            console.log('Done');
        }
    });
}