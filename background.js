chrome.tabs.query({url: "https://app.asana.com/*"}, function(results) {
    results.forEach(function(tab){
        chrome.tabs.executeScript(tab.id, {file: "asana-animal-parades.js"});
    });
});