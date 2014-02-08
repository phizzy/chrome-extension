// 该文件内的代码在chrome后台运行

// tab加载完之后，在页面执行js和css
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    if (info.status!=='complete') {
        return;
    }
    chrome.tabs.insertCSS(tabId, {file: 'background/module/{%=_Module_Name_%}/content.css'}, function() {});
    chrome.tabs.executeScript(tabId, {file: 'background/module/{%=_Module_Name_%}/content.js'}, function() {});

    var script = function() {
    // 在该函数内的代码将在前台页面执行
    // 可以在此调用content.js中定义的函数和变量
        console.log('runFrontend: Test');
    };
    runFrontend(script, {}, function() {
        console.log('run script');
    });
});
