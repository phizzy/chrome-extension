function sleep(ts) {
    var origin = (new Date()).getTime();
    var current;
    while (true) {
        current = (new Date()).getTime();
        if (current - origin >= ts) break;
    }
}

var storage = {
    get: function(key, defaultValue) {
        var data = {};
        var result;
        data[key] = defaultValue===undefined ? false : defaultValue;
        chrome.storage.local.get(data, function(items) {
            result = items[key];
        });
        return result;
    }
};

// 发送请求之前
chrome.webRequest.onBeforeRequest.addListener(function(info) {
    var disableJS = storage.get('disableJS');
    if (disableJS && /[^\?\#]+\.js(\?|\#|\/|$)/.test(info.url)) {
        alert(info.url);
        return {cancel: true};
    }
}, {
    urls: [
        '*://*/*'
    ]
}, [
    'blocking'
]);

// // 发送请求header之前
// chrome.webRequest.onBeforeSendHeaders.addListener(function(info) {
// }, {
//     urls: [
//         '*://*/*'
//     ]
// }, [
//     'blocking'
// ]);
// 
// // 响应header接受完成
// chrome.webRequest.onHeadersReceived.addListener(function(info) {
//     sleep(5000);
// }, {
//     urls: [
//         '*://*/*'
//     ]
// }, [
//     'blocking'
// ]);
