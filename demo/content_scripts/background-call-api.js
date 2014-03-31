var runBackground = function(event, request) {
    var sevent = event.split(':', 2),
        request = request || {},
        callback = callback || function() {};
    request.module = sevent[0];
    request.method = sevent[1];
    chrome.extension.sendMessage(request);
};

// 前端module

var Module = {};

// 用于接收来自background的runFrontend消息响应
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var response = {};
    var module = request.module,
        method = request.method;
    if (Module[module] && Module[module][method]) {
        response = Module[module][method](request.data);
    }
    sendResponse(response);
});
