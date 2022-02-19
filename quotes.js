var quotes = [
    'hello world!',
    'free!',
    'now!',
    'thinking...',
    'minimal!',
    'have a nice day!'
];

function load_theme() {
    chrome.storage.sync.get('theme', function(data){
      setBackgroundColor(data.theme);
    });
}

function setBackgroundColor(color) {
    if(color === 'dark') {
        document.body.style.backgroundColor = '#555555';
    } else {
        document.body.style.backgroundColor = 'white';
    }
}

window.onload = function newQuote() {
    load_theme();
    var randomNumber = Math.floor(Math.random() * (quotes.length));
    document.getElementById('quoteDisplay').innerHTML = quotes[randomNumber];
}

chrome.storage.onChanged.addListener((changes, area) => {
    load_theme();
  });
