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
            file: 'ocean-team-sprint62.html',
            title: 'Ocean Team - Sprint 62 review',
            theme: 'ocean',
        },
        {
            file: 'ocean-team-sprint63.html',
            title: 'Ocean Team - Sprint 63 review',
            theme: 'ocean',
        },
        {
            file: 'ocean-team-sprint64.html',
            title: 'Ocean Team - Sprint 64 review',
            theme: 'ocean',
        },
        {
            file: 'ocean-team-sprint65.html',
            title: 'Ocean Team - Sprint 65 review',
            theme: 'ocean',
        },
        {
            file: 'ocean-team-sprint66.html',
            title: 'Ocean Team - Sprint 66 review',
            theme: 'ocean',
        },
    ],
    reveal: {
        dependencies: [
            { src: 'plugin/markdown/marked.js' },
            { src: 'plugin/markdown/markdown.js' },
            { src: 'plugin/notes/notes.js', async: true },
            {
                src: 'plugin/highlight/highlight.js', async: true, callback: function () {
                    hljs.initHighlightingOnLoad();
                }
            }
        ],
    },
};
