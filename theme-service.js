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
    }
};