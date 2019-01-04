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
            file: 'ocean-team-sprint58.html',
            title: 'Ocean Team - Sprint 58 review',
            theme: 'ocean',
        },
        {
            file: 'ocean-team-sprint59.html',
            title: 'Ocean Team - Sprint 59 review',
            theme: 'ocean',
        },
        {
            file: 'ocean-team-sprint60.html',
            title: 'Ocean Team - Sprint 60 review',
            theme: 'ocean',
        },
        {
            file: 'ocean-team-sprint61.html',
            title: 'Ocean Team - Sprint 61 review',
            theme: 'ocean',
        },
        {
            file: 'ocean-team-sprint62.html',
            title: 'Ocean Team - Sprint 62 review',
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
