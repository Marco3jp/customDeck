// アイコンクリック時のイベント
chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
    tweetCurrentTab(tab);
});

// 拡張機能インストール時にコンテキストメニューを作成
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "tweet-current-page",
        title: "このページをツイート",
        contexts: ["page", "link", "selection"]
    });
});

// コンテキストメニューがクリックされた時
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "tweet-current-page" && tab) {
        tweetCurrentTab(tab);
    }
});

// 現在のタブをツイートする関数
function tweetCurrentTab(tab: chrome.tabs.Tab) {
    if (tab.title && tab.url) {
        const tweetUrl = `https://x.com/intent/post?text=${encodeURIComponent(tab.title)}&url=${encodeURIComponent(tab.url)}`;
        chrome.tabs.create({ url: tweetUrl });
    }
}
