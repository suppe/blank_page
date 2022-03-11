import { loadTheme } from "./theme-service.js";
import { loadSnippets } from "./list-service.js";


chrome.storage.onChanged.addListener(() => {
    loadTheme();
    loadSnippets();
});

//On load
window.onload = function() {
    loadTheme();
    loadSnippets();
}