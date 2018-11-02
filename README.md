# soure2one

将源代码整合到一个 markdown 文件，方便打印和阅读。

Convert all source code to one markdown file, useful to print and read.

## Usage

    // generate files in folder "src" to "src.source.md", ignore __test__
    source2one src -i __test__

## Install

    npm install source2one -g

## Options

**-i**: ignore files, seprated by `,`

    source2one src -i *.md,__test__

-h, --help: show help info
    
## To html/pdf

[pandoc](https://github.com/jgm/pandoc): markdown to html 

[wkhtmltopdf](https://wkhtmltopdf.org/): html to pdf

## Example

test/core/core.js: 

    core content

test/plugin/plugin.js: 

    plugin content
    plugin content2

After running `source2one test`, output `test.source.md`: 

    # test
    generated at 2018-5-14 12:48:17
    
    ## TOC
    
    ⃞ test/core/core.js (lines: 1)
    
    ⃞ test/plugins/plugin.js (lines: 2)
    
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

