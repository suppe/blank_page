export const Themes = {
    dark: 'dark',
    light: 'light'
};

export function saveTheme(value) {
    chrome.storage.sync.set({'theme': value});
}

export function loadTheme() {
    chrome.storage.sync.get('theme', function(data) {
        setTheme(data.theme);
        setSelect(data.theme);
    });
}

export function setTheme(theme) {
    const cl = document.body.classList;
    theme === Themes.dark ? cl.replace('light', 'dark') : cl.replace('dark', 'light');
}

export function setSelect(theme) {
    const select = document.getElementById('theme');
    select.value = theme || 'light';
}