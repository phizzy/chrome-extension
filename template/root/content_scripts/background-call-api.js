var runBackground = function(event, request) {
    // event = "Module:Method";
    // request = {};
    var sevent = event.split(':', 2),
        request = request || {};
    request.module = sevent[0];
    request.method = sevent[1];
    chrome.extension.sendMessage(request);
};
