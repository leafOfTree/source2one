var fs = require('fs');

var targetFile;
var ignoreFiles;

module.exports = function generate(toc) {
    targetFile = toc.targetFile;
    ignoreFiles = toc.ignoreFiles;

    initTargetFile(toc.sourceDir, toc.targetFile);

    appendLineToTargetFile(toc.title, toc.targetFile);
    traverse(toc.sourceDir, toc.node, {
        onlyPath: true
    });

    appendLineToTargetFile(toc.contentTitle, toc.targetFile);
    traverse(toc.sourceDir, toc.node, {
        onlyPath: false
    });

    console.log('Generate file: ' + targetFile);
}

function initTargetFile(sourceDir) {
    var initStr = `# ${sourceDir.replace(/\\/g, '/')}\ngenerated at ${new Date().toLocaleString()}\n\n`;
    fs.writeFileSync(targetFile, initStr);
}

function appendLineToTargetFile(line) {
    fs.appendFileSync(targetFile, line);
}

function appendNodeToTargetFile(node) {
    var data = '';
    if (node.path) {
        data += '\n' + node.path;
    }
    if (node.data) {
        data += '\n```\n' + node.data + '```\n';
    }
    fs.appendFileSync(targetFile, data);
}

function appendNodeToToc(node, parent) {
    //console.log(parent)
    if (parent.children) {
        parent.children.push(node);
    } else {
        parent.children = [node];
    }

    return node;
}

function traverse(dir, node, options) {
    fs.readdirSync(dir).filter(filterFile).forEach((file) => {
        var path = dir + '/' + file;
        var currentNode = {
            path,
            value: file
        };
        appendNodeToToc(currentNode, node);

        var stats = fs.statSync(path);
        if (stats.isFile()) {
            var data = fs.readFileSync(path);
            var lines = getFileLines(data);

            var onlyPath = options && options.onlyPath;
            if (!onlyPath) {
                currentNode.data = data;
                currentNode.path = `${currentNode.path} (lines: ${lines})`;
            } else {
                currentNode.path = `&#x20DE; ${currentNode.path} (lines: ${lines})\n`;
            }
            appendNodeToTargetFile(currentNode);
        } else {
            traverse(path, currentNode, options);
        }
    })
}

function filterFile(file) {
    var isIgnored;
    if (ignoreFiles) {
        var ignores = ignoreFiles.split(',');
        ignores.forEach(function (ignore) {
            var ignorePattern = new RegExp(ignore
                .replace(/\./g, '\\.').replace(/\*/g, '.*'));

            if (file.match(ignorePattern)) {
                isIgnored = true;
            }
        })
    } 
    return !isIgnored;
}

function getFileLines(data) {
    return data.toString().split('\n').length - 1;
}
