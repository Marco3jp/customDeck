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
    const currentTime = Math.round(new Date().getTime() / 1000);
    if (timestamp !== null && timestamp > currentTime - 1800) { // 1800sec = 30min
        const timer = 1800 - (currentTime - timestamp);
        displayAlertModal(["前回の閲覧から30分経過していません。",
            "また、デフォルトではモーダルを閉じることはできません。",
            "Tweetしたいだけなら、以下のIntentをご利用ください。",
            `あと${(timer > 60 ? Math.floor(timer / 60) + "分" : "") + timer % 60 + "秒"}くらいです`
        ]);
    } else {
        startTimer();
    }

    function startTimer() {
        localStorage.setItem("manager_latestTimestamp", (Math.round((new Date()).getTime() / 1000)).toString());
        setInterval(() => {
            localStorage.setItem("manager_latestTimestamp", (Math.round((new Date()).getTime() / 1000)).toString());
        }, 30000); // 30秒ごとに更新
    }

    function displayAlertModal(msgs) {
        let wrapper = document.createElement("div");
        let alertModal = document.createElement("div");
        let buttonWrapper = document.createElement("div");

        wrapper.style.height = "100vh";
        wrapper.style.width = "100vw";
        wrapper.style.background = "rgba(16, 23, 30 ,1)";
        wrapper.style.position = "fixed";
        wrapper.style.top = "0";
        wrapper.style.left = "0";
        wrapper.style.zIndex = "10000";

        alertModal.style.height = "150px";
        alertModal.style.width = "500px";
        alertModal.style.margin = "auto";
        alertModal.style.inset = "0";
        alertModal.style.position = "absolute";

        buttonWrapper.style.display = "flex";
        buttonWrapper.style.justifyContent = "space-evenly";
        buttonWrapper.style.marginTop = "30px";

        let msgElements = [];

        msgs.forEach(msg => {
            let msgParagraph = document.createElement("p");
            msgParagraph.style.textAlign = "center";
            msgParagraph.style.fontSize = "16px";
            msgParagraph.style.color = "rgba(250, 250, 250,1)";
            msgParagraph.textContent = msg;
            msgElements.push(msgParagraph);
        });

        let closeWindowButton = createButtonElm("ページを閉じる", () => {
            window.close();
        });

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

    function createButtonElm(msg, clickCallback) {
        let button = document.createElement("button");
        button.textContent = msg;
        button.type = "button";
        button.addEventListener("click", clickCallback);
        return button;
    }
})();
