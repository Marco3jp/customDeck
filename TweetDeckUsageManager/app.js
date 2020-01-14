// ==UserScript==
// @name         TweetDeck Usage Manager
// @version      1.0
// @author       Marco
// @match        https://tweetdeck.twitter.com/*
// @namespace    https://marco.plus
// @homepage     https://marco.plus
// @website      https://twitter.com/Marco_utau
// @grant        window.close
// ==/UserScript==

(function () {
    'use strict';
    const timestamp = localStorage.getItem("manager_latestTimestamp");
    const openingTime = getCurrentUNIXTime();

    if (timestamp !== null && timestamp > openingTime - 1800) { // 1800sec = 30min
        const timer = 1800 - (openingTime - timestamp);
        displayAlertModal(["前回の閲覧から30分経過していません。",
            "また、デフォルトではモーダルを閉じることはできません。",
            "Tweetしたいだけなら、以下のIntentをご利用ください。",
            `あと${(timer > 60 ? Math.floor(timer / 60) + "分" : "") + timer % 60 + "秒"}くらいです`
        ]);
    } else {
        startTimer();
    }

    function startTimer() {
        localStorage.setItem("manager_latestTimestamp", getCurrentUNIXTime().toString());
        setInterval(() => {
            localStorage.setItem("manager_latestTimestamp", getCurrentUNIXTime().toString());
        }, 30000); // 30秒ごとに更新
    }

    function displayTimeoutModal() {
        let wrapper = createModalWrapper();

    }

    function displayAlertModal(msgs) {
        let wrapper = createModalWrapper();
        let alertModal = createAlertModal("150px", "500px");
        let buttonWrapper = document.createElement("div");

        buttonWrapper.style.display = "flex";
        buttonWrapper.style.justifyContent = "space-evenly";
        buttonWrapper.style.marginTop = "30px";

        let msgElements = createParagraphElms(msgs);

        let closeWindowButton = createButtonElm("ページを閉じる", closeWindow);

        /**
         let closeModalButton = createButtonElm("モーダルを閉じる", ()=>{
            startTimer();
            wrapper.parentNode.removeChild(wrapper);
        })
         */

        let openIntentPageButton = createButtonElm("ツイート画面に飛ぶ", () => {
            window.open("https://twitter.com/intent/tweet");
            window.close();
        });

        msgElements.forEach(msgParagraph => alertModal.appendChild(msgParagraph));
        buttonWrapper.appendChild(closeWindowButton);
        // buttonWrapper.appendChild(closeModalButton);
        buttonWrapper.appendChild(openIntentPageButton);
        alertModal.appendChild(buttonWrapper);
        wrapper.appendChild(alertModal);
        document.body.appendChild(wrapper);
    }

    function createModalWrapper() {
        let wrapper = document.createElement("div");
        wrapper.style.height = "100vh";
        wrapper.style.width = "100vw";
        wrapper.style.background = "rgba(16, 23, 30 ,1)";
        wrapper.style.position = "fixed";
        wrapper.style.top = "0";
        wrapper.style.left = "0";
        wrapper.style.zIndex = "10000";
        return wrapper
    }

    function createAlertModal(height, width) {
        let alertModal = document.createElement("div");
        alertModal.style.height = height;
        alertModal.style.width = width;
        alertModal.style.margin = "auto";
        alertModal.style.inset = "0";
        alertModal.style.position = "absolute";
        return alertModal;
    }

    function createButtonElm(msg, clickCallback) {
        let button = document.createElement("button");
        button.textContent = msg;
        button.type = "button";
        button.addEventListener("click", clickCallback);
        return button;
    }

    function createParagraphElms(msgs) {
        let msgElements = [];

        msgs.forEach(msg => {
            let msgParagraph = document.createElement("p");
            msgParagraph.style.textAlign = "center";
            msgParagraph.style.fontSize = "16px";
            msgParagraph.style.color = "rgba(250, 250, 250,1)";
            msgParagraph.textContent = msg;
            msgElements.push(msgParagraph);
        });

        return msgElements;
    }

    function closeWindow() {
        window.close();
    }

    function getCurrentUNIXTime() {
        return Math.round((new Date()).getTime() / 1000)
    }
})();
