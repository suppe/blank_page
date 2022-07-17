const cloudSerivce = {
    type: {
        theme: 'theme',
        snippets: 'snippets'
    },

    //Cloud Operations
    save(value, type) {
        chrome.storage.sync.set({type: value});
    },

    load(type) {
        chrome.storage.sync.get(type, function(data) {
            return data[type];
        });
    }
};