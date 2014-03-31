'use strict';

// Basic template description.
exports.description = '基于GruntJS创建Chrome Extension的模板';


// Template-specific notes to be displayed before question prompts.
//exports.notes = '--';

// Template-specific notes to be displayed after question prompts.
//exports.after = '--';

// Any existing file or directory matching this wildcard will cause a warning.
//exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
    var args = process.argv.slice(3);
    if (!args.length) {
        console.warn('\t1.\t请输入module name, 空格分隔多个');
        console.warn('\t2.\t--module: 仅增加module');
        console.warn('\t3.\t--devtool: 添加devtool扩展');
        return;
    }

    var modules = [],
        modulesStr = '',
        justModule = false,
        hasDevTool = false;
    args.forEach(function(val, index, array) {
        if (!/^\-\-/.test(val)) {
            modules.push(val);
            modulesStr += '\n,"background/module/'+val+'/run.js"';
            modulesStr += '\n,"background/module/'+val+'/module.js"';
        }
        else {
            switch (val) {
            case '--module':
                justModule = true;
                break;
            case '--devtool':
                hasDevTool = true;
                break;
            };
        }
    });

    var templatePath = process.argv[2],
        defaultProps = grunt.file.readJSON(templatePath + '/default.json');

    init.process({
        modules: modulesStr
        ,hasDevTool: hasDevTool
    }, [
        init.prompt('name', 'Name')
        ,init.prompt('description', 'Description')
        ,init.prompt('version', '0.1.0')
    ], function(err, props) {
        for (var i in defaultProps) {
            props[i] = defaultProps[i];
        }

        // Files to copy (and process).
        var files;

        if (!justModule) {
            files = init.filesToCopy();
            // Actually copy (and process) files.
            init.copyAndProcess(files, props, {noProcess: 'icons/*'});
        }

        var needWriteJSON = false;
        if (justModule || hasDevTool) {
            var manifestFile = init.destpath() + '/manifest.json';
            var manifestContent = grunt.file.readJSON(manifestFile);
            needWriteJSON = true;
        }

        if (hasDevTool) {
            manifestContent.devtools_page = 'devtools/index.html';
        }

        if (modules.length) {
            for (var i=0,l=modules.length; i<l; i++) {
                files = {};
                var tmp = 'background/module/'+modules[i]+'/run.js';
                files[tmp] = 'template/module/run.js';
                files['background/module/'+modules[i]+'/module.js'] = 'template/module/module.js';
                files['background/module/'+modules[i]+'/content.js'] = 'template/module/content.js';
                files['background/module/'+modules[i]+'/content.css'] = 'template/module/content.css';
                props['_Module_Name_'] = modules[i];
                init.copyAndProcess(files, props);
                if (needWriteJSON && manifestContent.background.scripts.indexOf(tmp)===-1) {
                    manifestContent.background.scripts.push(tmp);
                    manifestContent.background.scripts.push('background/module/'+modules[i]+'/module.js');
                }
            }
        }

        if (needWriteJSON) {
            grunt.file.write(manifestFile, JSON.stringify(manifestContent));
        }

        done();
    });
};

