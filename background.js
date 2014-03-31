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
        var result = localStorage.getItem(key);
        switch (result) {
            case null:
                return defaultValue;
                break;
            case 'true':
            case '1':
                return true;
                break;
            case 'false':
            case '0':
                return false;
                break;
            default:
                return result;
        }
    }
};

var patterns = {
    js: /[^\?\#]+\.js(\?|\#|\/|$)/i
    ,css: /[^\?\#]+\.css(\?|\#|\/|$)/i
    ,img: /[^\?\#]+\.(?:(?:jpg)|(?:png)|(?:gif))(\?|\#|\/|$)/i
};
function getType(url) {
    for (var key in patterns) {
        if (patterns[key].test(url)) {
            return key;
        }
    }
};

var urls = storage.get('urls', ['*://*/*']);

// 发送请求之前
chrome.webRequest.onBeforeRequest.addListener(function(info) {
    var type = getType(info.url),
        key = 'disable' + type.toUpperCase();
    if (storage.get(key)) return {cancel: true};
}, {
    urls: urls
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
