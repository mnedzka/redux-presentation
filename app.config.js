module.exports = {
  presentations: [
    {
      file: 'index.html',
      title: 'Ocean Team Presentations',
      template: 'index',
    },
    {
      file: 'redux-ksh.html',
      title: 'Redux Introduction',
      theme: 'sky',
    },
  ],
  reveal: {
    dependencies: [
      { src: 'plugin/markdown/marked.js' },
      { src: 'plugin/markdown/markdown.js' },
      { src: 'plugin/notes/notes.js', async: true },
      {
        src: 'plugin/highlight/highlight.js',
        async: true,
        callback: function() {
          hljs.initHighlightingOnLoad();
        },
      },
    ],
  },
};
