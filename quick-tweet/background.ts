chrome.browserAction.onClicked.addListener((tab: chrome.tabs.Tab) => {
    tweetCurrentTab(tab)
});

function openNewIntentTab() {
    chrome.tabs.create({"url": "https://twitter.com/intent/tweet"});
}

function tweetCurrentTab(tab: chrome.tabs.Tab) {
    chrome.tabs.create({"url": `https://twitter.com/intent/tweet?text=${encodeURIComponent(tab.title) + "&url=" + encodeURIComponent(tab.url)}`});
}


function displayErrorMessage(err) {
    console.error("何らかのエラーが発生しました。以下の情報を参考にしてください。");
    console.error(err);
}

let parentMenu = chrome.contextMenus.create({
    title: "Let's tweet",
    visible: true,
});

chrome.contextMenus.create({
    title: "Display tweet page",
    visible: true,
    onclick: () => {
        openNewIntentTab();
    },
    parentId: parentMenu,
});

chrome.contextMenus.create({
    title: "Display tweet page with this page title and url",
    visible: true,
    onclick: (_, tab) => {
        tweetCurrentTab(tab);
    },
    parentId: parentMenu,
});
