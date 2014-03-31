var runFrontend = function(request) {
    chrome.tabs.query({
        'active': true
        ,'currentWindow': true
    }, function(tabs) {
        (function(tab) {
            chrome.tabs.sendMessage(tab.id, request, function(response) {
                request.callback && request.callback(response);
            });
        })(tabs[0]);
    });
};

// 后端module
var Module = {};
// 用于接收来自content script的runBackground消息并响应
chrome.extension.onMessage.addListener(function(request, sender) {
    var module = request.module,
        method = request.method;
    if (Module[module] && Module[module][method]) {
        if (Module[module][method+'Callback']) {
            request.callback = Module[module][method+'Callback'];
        }
        Module[module][method](request);
    }
});

