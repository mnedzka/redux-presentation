# Ocean Team Presentations
This project helps creating slides. It's built on top of [reveal.js library](https://github.com/hakimel/reveal.js).

## Usage
### Running presentation locally
1. Clone this repository.
1. Install dependencies with `npm install`. 
1. Run `npm start`. Once slides are bundles, application will start in your browser.
1. Exemplary slides are available at `presentations/example.html`.

### Building static package with presentation
1. Run `npm run build`. Static package will be generated.
1. Find your package at `public` directory. There are all static files needed inside.
1. Access your presentation by opening `public/{your_presentation}.html` your browser.
1. In order to share your presentation with other, you can now share entire `public` directory.

### Creating new slides
1. Create new record in `app.config.js` file, in `presentations` section. It should include `file` property, describing name of file with your slides, and `title` property, describing title of your presentation. Optionally, it can include `theme` property, containing name of file located in `css/theme` directory, and `template` property, containing name of file located in `templates` directory.
1. Create new HTML file in `presentations` directory, with name corresponding to one you've put in `app.config.js`.
1. Put your slides in new file, each slide represented by `<section>` element. You may configure each slide in a custom way, ad described in [documentation](https://github.com/hakimel/reveal.js#instructions).
1. Put all your assets in `assets` directory and link them with `assets` prefix in your slides (_no_ trailing slash). 
1. Run `npm start` and proceed to `/{your_presentation}.html` to see your slides.

### Modifying look and behavior
1. You can create new theme for your presentation, based on already existing themes, located in `css/theme` directory. If you use Sass, put it in `css/theme/source` directory. It will be compiled to CSS and located in `public` directory automatically during build process. If you use plain CSS, put it directly in `css/theme` directory.
1. You can create new template for your presentation, based on already existing templates, located in `templates` directory. It has to be EJS file. It will be compiled to HTML and located in `public` directory automatically during build process.
1. In order to change theme or template to another one, replace value of `theme` or `template` variable in `app.config.js` with value that corresponds to appropriate file name. Don't include file extension.
1. In order to change behavior of the presentation, modify value of `reveal` variable in `app.config.js`. You can find possible configuration options in [documentation](https://github.com/hakimel/reveal.js#configuration).

### Publishing presentation
Currently there is no process to publish the presentation and run it online. In order to display it, you need to run it on localhost. In order to share it, you need to build it as a static package. If you want your presentation to be available to other users of this project, you can create pull request with your changes to original repository of this project. 