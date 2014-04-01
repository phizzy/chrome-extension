function sleep(ts) {
    var origin = (new Date()).getTime();
    var current;
    while (((new Date()).getTime() - origin) < ts) {}
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

var urls = storage.get('urls', ['http://*/*', 'https://*/*']);

// 发送请求之前
chrome.webRequest.onBeforeRequest.addListener(function(info) {
    var id = info.tabId + '',
        tabid = localStorage.getItem('tabid');
    if (tabid!==id) {
        return;
    }
    var type = getType(info.url),
        key = 'disable' + type.toUpperCase();
    if (storage.get(key)) return {cancel: true};
    var speeds = storage.get('speeds');
    switch (speeds) {
        case 'speed2G':
            sleep(10000);
            break;
        case 'speed3G':
            sleep(3000);
            break;
    }
}, {
    urls: urls
}, [
    'blocking'
]);
