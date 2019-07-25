// ==UserScript==
// @name         forMeDeck
// @namespace    https://marco.plus
// @version      0.1
// @description  This is TweetDeck custom script for me.
// @author       Marco
// @match        https://tweetdeck.twitter.com*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    var newTweetIframeStyleSheet = ":root{--original-white:rgba(250,250,250,1);--original-gray:rgba(158,158,158,1);--original-black:rgba(33,33,33,1);--Dark:rgba(27,40,54,1);--deep-dark:rgba(61,84,102,1);--light-dark:rgba(96,125,139,1)}body{overflow-y:hidden}.css-1dbjc4n.r-1awozwy.r-1iusvr4.r-16y2uox.r-4amgru.r-8kwpq0.r-bcqeeo{display:none}.notranslate.public-DraftEditor-content{font-size:14px;font-family:\"Roboto\",\"Yu Gothic Medium\",YuGothic,'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro','メイリオ',Meiryo,'ＭＳ Ｐゴシック','MS PGothic',sans-serif!important;padding:10px!important;background-color:var(--light-dark)!important;border-radius:5px}[style=\"color: rgb(27, 149, 224);\"]{color:rgba(128,216,255,1)!important}";
    function init() {
        var startTime = Date.now();
        var config = { childList: true, subtree: true };
        var getNewTweetColumn = function (mutationsList, columnObserver) {
            var drawer = document.querySelector(".js-drawer");
            if (drawer !== null) {
                columnObserver.disconnect();
                var getIframeCallback = function (mutationsList, iframeObserver) {
                    if (document.querySelector(".r-1yadl64.r-16y2uox") !== null) {
                        iframeObserver.disconnect();
                        injectStyleSheetInNewTweetIframe();
                    }
                    else if (startTime + 1000 * 30 < Date.now()) { // timeout 30sec
                        iframeObserver.disconnect();
                        tweetDeckAlert("Timeout: Cannot find NewTweetElement.");
                    }
                };
                var iframeObserver = new MutationObserver(getIframeCallback);
                iframeObserver.observe(drawer, config);
            }
            else if (startTime + 1000 * 30 < Date.now()) { // timeout 30sec
                columnObserver.disconnect();
                tweetDeckAlert("Timeout: Cannot find NewTweetColumn.");
            }
        };
        var columnObserver = new MutationObserver(getNewTweetColumn);
        columnObserver.observe(document.body, config);
    }
    function injectStyleSheetInNewTweetIframe() {
        var newTweetIframe = document.querySelector(".r-1yadl64.r-16y2uox");
        if (newTweetIframe === null) {
            tweetDeckAlert("Not available: This forMeDeck version is incompatible latest TweetDeck version.");
        }
        else {
            var styleElm = document.createElement("style");
            styleElm.textContent = newTweetIframeStyleSheet;
            newTweetIframe.contentDocument.querySelector("head").appendChild(styleElm);
        }
    }
    function tweetDeckAlert(message) {
        var divElm = document.createElement("div");
        var spanElm = document.createElement("span");
        spanElm.textContent = message;
        divElm.classList.add("deckAlertWrapper");
        spanElm.classList.add("deckAlert");
        divElm.appendChild(spanElm);
        document.body.appendChild(divElm);
        setTimeout(function () {
            document.body.removeChild(divElm);
        }, 3000);
    }
    init();
})();
