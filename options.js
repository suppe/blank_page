import { ThemeService } from "./theme-service.js";
import { SnippetService } from "./snippet-service.js";


//Event Listeners
const input = document.getElementById("txt");
input.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    SnippetService.addSnippet(input.value);
    input.value = '';
  }
});

document.getElementById('list').addEventListener('click', function(event) {
  SnippetService.delSnippet(event.target.innerText);
});

const select = document.getElementById('theme');
select.addEventListener('change', function() {
  ThemeService.setTheme(select.value);
});

//On Load
window.onload = function listen() {
  ThemeService.loadTheme();
  SnippetService.loadSnippets();
}