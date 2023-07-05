// ==UserScript==
// @name         forMeDeck
// @description  the world won't end
// @version      2.0
// @author       Marco
// @homepage     https://marco.plus
// @namespace    https://marco.plus
// @website      https://twitter.com/Marco_utau
// @match        https://tweetdeck.twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tweetdeck.twitter.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const style = `
    /* 左側のバーを小さくするやつ */
    .r-1gymjhz {
      width: 50px;
    }

    /* スクロールバー調整 */
    .r-1bzj12m::-webkit-scrollbar {
      width: 4px;
    }

    .r-1bzj12m::-webkit-scrollbar-thumb {
      background-color: rgba(158, 158, 158, 1);
    }

    /* r-rbxt48はカラムに幅を指定しているクラス */
    .r-rbxt48 {
      width: 340px !important;
    }

    /* ツイート枠のwrapperとinnerにかかるセレクタ */
    .css-1dbjc4n.r-18u37iz.r-5swwoo.r-bnwqim *[style='width: 360px;'] {
      width: 320px !important;
    }

    /* .r-1h8ys4aがなんかpadding topついてるクラス、その子にあるr-779j7eが横方向のpadding持ってる
       これ組み合わせてツイート書くカラムにフォーカスして横方向のpaddingを14px -> 4px にしてる */
    .r-1h8ys4a .r-779j7e {
      padding: 0 4px;
    }

    /* ツイート書くカラムのボーダーとかコマンド置き場の謎寄せを消す */
    .r-1x5g5r8 {
      margin-left: unset;
    }
    `

    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    document.body.appendChild(styleElement);
})();
