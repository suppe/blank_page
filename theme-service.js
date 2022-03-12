export const ThemeService = {
    Themes: {
        dark: 'dark',
        light: 'light'
    },

    select: document.getElementById('theme'),

    //Theme Operations
    setTheme(theme) {
        const cl = document.body.classList;
        theme === ThemeService.Themes.dark ? cl.replace('light', 'dark') : cl.replace('dark', 'light');
        ThemeService.saveTheme(theme);
    },

    setSelect(theme) {
        ThemeService.select.value = theme || 'light';
    },

    //Cloud Operations
    saveTheme(value) {
        chrome.storage.sync.set({'theme': value});
    },

    loadTheme() {
        chrome.storage.sync.get('theme', function(data) {
            ThemeService.setTheme(data.theme);
            if(ThemeService.select !== null) {
                ThemeService.setSelect(data.theme);
            }
        });
    }
};