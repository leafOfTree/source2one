# soure2one

将源代码整合到一个 markdown 文件，方便打印和阅读。

Convert all source code to one markdown file, useful to print and read.

## Install

    npm install source2one -g

## Usage

    source2one src
    // generate src.source.md

## Example

test/core/core.js: 

    core content

test/plugin/plugin.js: 

    plugin content
    plugin content2

test.source.md: 

    # test
    generated at 2018-5-14 12:48:17
    
    ## TOC
    
    &#x20DE; test/core/core.js (lines: 1)
    
    &#x20DE; test/plugins/plugin.js (lines: 2)
    
    ## Content
    
    test/core/core.js (lines: 1)
    ```
    core content
    ```
    
    test/plugins/plugin.js (lines: 2)
    ```
    plugin content
    plugin content2
    ```

