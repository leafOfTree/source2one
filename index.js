#!/usr/bin/env node

var fs = require('fs')
var generate = require('./lib');

main();

function main() {
  var argObj = parseArgs();
  var sourceDir = argObj.sourceDir;
  var ignoreFiles = argObj.i;
  var showHelp = argObj.h || argObj.help;

  if (showHelp) {
    console.log(`Usage: source2one target [-i ignored_file1,ignored_file2...]`)
  } else if (!sourceDir) {
    console.log('Source dir is required');
  } else {
    var targetFile = `${sourceDir.replace(/(\\|\/)/g, '_')}.source.md`;
    var tocConfig = {
      sourceDir,
      ignoreFiles, 
      targetFile,
      title: '## TOC\n',
      contentTitle: '\n## Content\n',
      node: {
        value: sourceDir,
        children: []
      }
    };

    generate(tocConfig);
  }
}

/**
 * -i: ignore
 * -h: help
 */
function parseArgs() {
  var args = process.argv.slice(2);
  var argObj = {};
  for (var i = 0 ; i < args.length; i++) {
    ['i', 'h', 'help'].forEach(function (opt) {
      if ((args[i] === ('-' + opt) || args[i] === ('--' + opt)) 
        && args[i + 1]) {
        argObj[opt] = args[i + 1];
        args[i] = args[i + 1] = null;
        i++;
      } else if (args[i].match(/-.*/)) {
        console.log('Error! Unsupported option: ' + args[i])
        process.exit(1)
      }
    })
  }
  args.forEach(function (arg) {
    if (arg) {
      argObj['sourceDir'] = arg;
    }
  })
  return argObj;
}
