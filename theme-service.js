export const Themes = {
    dark: 'dark',
    light: 'light'
};

const select = document.getElementById('theme');

//Theme Cloud
function saveTheme(value) {
    chrome.storage.sync.set({'theme': value});
}

export function loadTheme() {
    chrome.storage.sync.get('theme', function(data) {
        setTheme(data.theme);
        if(select !== null) {
            setSelect(data.theme);
        }
    });
}

//Set Theme
export function setTheme(theme) {
    const cl = document.body.classList;
    theme === Themes.dark ? cl.replace('light', 'dark') : cl.replace('dark', 'light');
    saveTheme(theme);
}

function setSelect(theme) {
    select.value = theme || 'light';
}