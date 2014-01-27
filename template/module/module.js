// 声明可被前端调用的后端Modle
var Module = Module || {};
Module.{%=_Module_Name_%} = {
    debug: function(data) {
        chrome.tabs.captureVisibleTab(function(dataURL) {
            runFrontend(function(jsonString) {
                console.log(jsonString);
            }, {img: dataURL});
        });
    }
};
