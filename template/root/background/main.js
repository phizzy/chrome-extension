var runFrontend = function(script, json, callback) {
    chrome.tabs.query({
        'active': true
        ,'currentWindow': true
    }, function(tabs) {
        (function(tab) {
            chrome.tabs.executeScript(tab.id, {
                code: '('+script.toString()+')(\''+JSON.stringify(json)+'\')'
            }, callback || function() {});
        })(tabs[0]);
    });
};

// 后端module
var Module = {};
// 用于接收来自content script的runBackground消息并响应
chrome.runtime.onMessage.addListener(function(request, sender) {
    var module = request.module,
        method = request.method;
    if (Module[module] && Module[module][method]) {
        Module[module][method](request);
    }
});

