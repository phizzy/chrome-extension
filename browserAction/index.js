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

(function() {
    var eles = document.querySelectorAll('[name^=disable]');
    Array.prototype.forEach.call(eles, function(ele) {
        ele.addEventListener('change', function() {
            localStorage.setItem(this.id, this.checked);
        });
        ele.checked =  storage.get(ele.id) ? 'checked' : '';
    });

    eles = document.querySelectorAll('[name=speeds]');
    var checked = false;
    Array.prototype.forEach.call(eles, function(ele) {
        ele.addEventListener('change', function() {
            localStorage.setItem('speeds', this.id);
        });
        if (storage.get('speeds')===ele.id) {
            ele.checked = 'checked';
            checked = true;
        }
        else {
            ele.checked = '';
        }
    });
    if (!checked) {
        eles[0].checked = 'checked';
    }
})();

chrome.tabs.query({
    currentWindow: true
    ,active: true
}, function(tabs) {
    var id = tabs[0].id;
    document.querySelector('#ok').addEventListener('click', function() {
        chrome.tabs.reload(id);
    });
});
