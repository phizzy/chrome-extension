chrome.contextMenus.create({
    title: "翻译: %s"
    ,contexts: ["selection"]
    ,onclick: function(info, tab) {
        var script = function(txt) {
            var key = 'CiQ4cm8pKNo4goVSMsGBWFWn';
            var url = [
                'http://openapi.baidu.com/public/2.0/bmt/translate'
                ,'?'
                ,'client_id=', key
                ,'&from=auto&to=auto'
                ,'&q=', encodeURI(txt)
            ].join('');
            $.get(url, function(data) {
                if (data.error_code) {
                    return showError('翻译失败：', data.error_msg);
                }
                var result = [], r;
                for (var i=0,l=data.trans_result.length; i<l; i++) {
                    r = data.trans_result[i];
                    result.push([r.src, "-->", r.dst].join("\t"));
                }
                showMsg(result.join("\n"));
            });
        };
        script = '(' + script.toString() + ')("'+info.selectionText+'");';
        chrome.tabs.executeScript(tab.id, {
            code: script
        }, function(){});
    }
});

// frontend
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    if (info.status!=='complete') {
        return;
    }
    chrome.tabs.insertCSS(tabId, {file: 'background/module/translate/content.css'}, function() {});
    chrome.tabs.executeScript(tabId, {file: 'background/module/translate/content.js'}, function() {});
});
