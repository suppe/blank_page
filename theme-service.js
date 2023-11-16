export const ThemeService = {
    Themes: {
        dark: 'dark',
        light: 'light'
    },

    select: document.getElementById('theme'),

    selectedTheme: 'dark',

    //Theme Operations
    setTheme(theme) {
        const cl = document.body.classList;
        const th = theme === 'system' ? ThemeService.checkSystem() : theme;

        th === ThemeService.Themes.dark ? cl.replace('light', 'dark') : cl.replace('dark', 'light');
        ThemeService.saveTheme(theme);
        ThemeService.selectedTheme = theme;
    },

    setThemeByOs() {
        if(ThemeService.selectedTheme === 'system') {
            const cl = document.body.classList;
            ThemeService.checkSystem() === ThemeService.Themes.dark ? cl.replace('light', 'dark') : cl.replace('dark', 'light');
        }
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
            ThemeService.selectedTheme = data.theme;
            if(ThemeService.select !== null) {
                ThemeService.setSelect(data.theme);
            }
        });
    },

    checkSystem() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },

    //Set Extension Icon when System Theme changes
    setExtensionIcon() {
        const isDark = ThemeService.checkSystem() === 'dark';
        chrome.action.setIcon({
            path: {
                "16": isDark ? "icons/icon16-dark.png" : "icons/icon16.png",
                "48": isDark ? "icons/icon48-dark.png" : "icons/icon48.png",
                "128": isDark ? "icons/icon128-dark.png" : "icons/icon128.png",
            }
        })
    }
};