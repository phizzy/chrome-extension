'use strict';

var pluginTitle = 'Name';

// The following code adds a sidebar pane contained in sidebar.html and titled pluginTitle to the Elements panel
chrome.devtools.panels.elements.createSidebarPane(pluginTitle, function(sidebar) {
    sidebar.setPage('devtools/sidebar.html');
});

/*
// The following code adds a panel contained in panel.html, represented by png on the Developer Tools toolbar and labeled as Font Picker:
chrome.devtools.panels.create(pluginTitle, 'icons/icon.48.png', 'devtools/panel.html', function(panel) {
});
*/
