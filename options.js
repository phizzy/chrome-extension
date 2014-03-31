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
    var eles = document.querySelectorAll('[type=checkbox]');
    Array.prototype.forEach.call(eles, function(ele) {
        ele.addEventListener('change', function() {
            localStorage.setItem(this.id, this.checked);
        });
    });
})();

(function() {
    var ids = [
            'js', 'css', 'img'
        ];
    var ele, key;
    for (var i=0,l=ids.length; i<l; i++) {
        key = 'disable' + ids[i].toUpperCase();
        ele = document.querySelector('#' + key);
        ele.checked =  storage.get(key) ? 'checked' : '';
    }
})();
