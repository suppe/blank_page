import { loadTheme, setTheme } from "./theme-service.js";
import { loadSnippets, addSnippet, delSnippet } from "./snippet-service.js";


//Event Listeners
const input = document.getElementById("txt");
input.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addSnippet(input.value);
    input.value = '';
  }
});

document.getElementById('list').addEventListener('click', function(event) {
  delSnippet(event.target.innerText);
});

const select = document.getElementById('theme');
select.addEventListener('change', function() {
  setTheme(select.value);
});

//On Load
window.onload = function listen() {
  loadTheme();
  loadSnippets();
}