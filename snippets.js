import { ThemeService } from "./theme-service.js";
import { SnippetService } from "./snippet-service.js";

chrome.storage.onChanged.addListener(() => {
    ThemeService.loadTheme();
    SnippetService.loadSnippets();
});

//On load
window.onload = function() {
    ThemeService.loadTheme();
    SnippetService.loadSnippets();
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    ThemeService.setThemeByOs();
});
