var $tpl = $('<div class="result-box"><span></span></div>');

var showError = function(txt) {
    showMsg(txt);
};

var clock;
var showMsg = function(txt) {
    if (clock) {
        clearTimeout(clock);
        clock = undefined;
    }
    $tpl.find('span').empty().text(txt);
    $('body').append($tpl);
    $tpl.show();
    clock = setTimeout(function() {
        $tpl.hide();
    }, 2000);
};
