chrome.browserAction.onClicked.addListener(function(activeTab)
{
    //chrome.tabs.update( activeTab.id , { url: 'index.html?url='+activeTab.url } );
    chrome.tabs.create({ url: 'index.html?url='+activeTab.url });
    

});

chrome.runtime.onInstalled.addListener(function (object) 
{
    chrome.tabs.create({ url: 'index.html' });
});

chrome.alarms.create('check_fetch', 
{
	when: Date.now(),
	periodInMinutes: 1
});
