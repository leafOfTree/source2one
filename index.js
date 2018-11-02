#!/usr/bin/env node

var fs = require('fs')
var generate = require('./lib');

main();

function main() {
  var argObj = parseArgs();
  var sourceDir = argObj.sourceDir;
  var ignoreFiles = argObj['-i'];
  var showHelp = argObj['-h'] || argObj['--help'];

  if (showHelp) {
    console.log(`
    Usage: source2one target [-i ignored_file1,ignored_file2,...]

    -i: ignore files, seprated by `,`
    -h, --help: show help info
    `)
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
 * --help: help
 */
function parseArgs() {
  var args = process.argv.slice(2);
  var argObj = {};
  for (var i = 0 ; i < args.length; i++) {
    var arg = args[i];
    if (['-i'].indexOf(arg) !== -1) {
      argObj[arg] = args[i + 1];
      args[i] = args[i + 1] = null;
    }
    if (['-h', '--help'].indexOf(arg) !== -1) {
      argObj[arg] = true;
      args[i] = null;
    }
    i++;
    if (!argObj[arg] && arg.indexOf('-') !== -1) {
      console.log('Error! Unsupported option: ' + args[i])
      process.exit(1)
    }
  }
  args.forEach(function (arg) {
    if (arg) {
      argObj['sourceDir'] = arg;
    }
  })
  return argObj;
}
