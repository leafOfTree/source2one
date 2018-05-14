var fs = require('fs')
var generate = require('./lib');

main();

function main() {
    var sourceDir = process.argv[2];
    if (!sourceDir) {
        console.log('Source dir is required');
    } else {
        var toc = {
            sourceDir,
            targetFile: `${sourceDir}.source.md`,
            title: '## TOC\n',
            contentTitle: '\n## Content\n',
            node: {
                value: sourceDir,
                children: []
            }
        };

        generate(toc);
    }
}
