chrome.devtools.panels.elements.onSelectionChanged.addListener(function() {
    document.getElementById('Test').innerHTML = arguments.length;
});
