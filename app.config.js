module.exports = {
    presentations: [
        {
            file: 'index.html',
            title: 'Ocean Team Presentations',
            template: 'index',
        },
        {
            file: 'example.html',
            title: 'Ocean Team Presentations - Example',
            theme: 'ocean',
        },
        {
            file: 'sprint58.html',
            title: 'Ocean Team Presentations - Sprint 58 review',
            theme: 'ocean',
        },
        {
            file: 'sprint58-2.html',
            title: 'Ocean Team Presentations - Sprint 58 v2 review',
            theme: 'ocean',
        },
        {
            file: 'sprint59.html',
            title: 'Ocean Team Presentations - Sprint 59 review',
            theme: 'ocean',
        },
    ],
    reveal: {
        dependencies: [
            {src: 'plugin/markdown/marked.js'},
            {src: 'plugin/markdown/markdown.js'},
            {src: 'plugin/notes/notes.js', async: true},
            {
                src: 'plugin/highlight/highlight.js', async: true, callback: function () {
                    hljs.initHighlightingOnLoad();
                }
            }
        ],
    },
};
