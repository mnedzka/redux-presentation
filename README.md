# Ocean Team Presentations
This project helps creating slides. It's built on top of [reveal.js library](https://github.com/hakimel/reveal.js).

## Usage
### Running presentation locally
1. Clone this repository.
1. Install dependencies with `npm install`. 
1. Run `npm start`. Once slides are bundles, application will start in your browser.
1. Exemplary slides are available at `presentations/generated/example.html`.

### Building static package with presentation
1. Run `npm run build`. Static package will be generated after successful run of unit tests.
1. Find your package at `static` directory. There are all static files needed inside.
1. Access your presentation by opening `static/{your_presentation}.html` your browser.
1. In order to share your presentation with other, you can now share entire `static` directory.

### Creating new slides
1. Create new record in `app.config.js` file, in `presentations` section. It should include `file` property, describing name of file with your slides, `title` property, describing title of your presentation, and `theme` property, describing name of the theme to be used for your presentation. Optionally, it can also include `destFile` property, describing name of resulting file with your presentation.
1. Create new HTML file in `presentations` directory, with name corresponding to one you've put in `app.config.js`.
1. Put your slides in new file, each slide represented by `<section>` element. You may configure each slide in a custom way, ad described in [documentation](https://github.com/hakimel/reveal.js#instructions).
1. Put all your assets in `assets` directory and link them with `/assets` prefix in your slides (_trailing slash_). 
1. Run `npm start` and proceed to `/presentations/{your_presentation}.html` to see your slides.

### Modifying styles and behavior
1. You can create new theme for your presentation, based on already existing templates, in `css/theme/source` directory. It will be compiled to css and located in `css/theme` directory automatically during build process.
1. In order to change theme to another one, replace value of `theme` variable in `app.config.js` with value that corresponds to appropriate file name in `css/theme` directory.
1. In order to change behavior of the presentation, modify value of `reveal` variable in `app.config.js`. You can find possible configuration options in [documentation](https://github.com/hakimel/reveal.js#configuration).

### Publishing presentation
Currently there is no process to publish the presentation and run it online. In order to display it, you need to run it on localhost. In order to share it, you need to build it as a static package. If you want your presentation to be available to other users of this project, you can create pull request with your changes to original repository of this project. 