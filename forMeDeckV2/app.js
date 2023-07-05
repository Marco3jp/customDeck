// ==UserScript==
// @name         forMeDeck
// @description  the world won't end
// @version      2.1
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
/* === 左側のみんなと関わらない領域 === */

    /* 左側のバーを小さくするやつ */
    .r-1gymjhz {
      width: 50px;
    }

    /* ツイート枠のwrapperとinnerにかかるセレクタ */
    .css-1dbjc4n.r-18u37iz.r-5swwoo.r-bnwqim *[style='width: 360px;'] {
      width: 300px !important;
    }

    /* .r-1h8ys4aがなんかpadding topついてるクラス、その子にあるr-779j7eが横方向のpadding持ってる
       これ組み合わせてツイート書くカラムにフォーカスして横方向のpaddingを14px -> 4px にしてる */
    .r-1h8ys4a .r-779j7e {
      padding: 0 4px;
    }

    /* ツイート書く枠のクラス */
    .public-DraftEditor-content {
      font-size: 14px;
    }

    /* ツイート書くカラムのボーダーとかコマンド置き場の謎寄せを消す */
    .r-1x5g5r8 {
      margin-left: unset;
    }

/* === みんなのツイートたちの領域 === */

    /* スクロールバー調整 */
    .r-1bzj12m::-webkit-scrollbar {
      width: 4px;
    }

    .r-1bzj12m::-webkit-scrollbar-thumb {
      background-color: rgba(158, 158, 158, 1);
    }

    /* r-rbxt48はカラムに幅を指定しているクラス */
    .r-rbxt48 {
      width: 320px !important;
    }

/* == ツイートに関する実装 ==  */
    /* ツイートの親 */
    article {
      padding-left: 8px;
    }

    /* 各ツイートの名前・UserID、時刻をWrapする枠をWrapする要素たち✨ */
    .css-1dbjc4n.r-k4xj1c.r-18u37iz.r-1wtj0ep > div:first-child,
    .css-1dbjc4n.r-k4xj1c.r-18u37iz.r-1wtj0ep > div > div,
    .css-1dbjc4n.r-k4xj1c.r-18u37iz.r-1wtj0ep > div > div > div {
      position: unset;
      flex-grow: 1;
    }

    /* 各ツイートの名前・UserID、時刻をWrapする枠 */
    .css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l[id^='id__'] {
      display: flex;
      flex-direction: row;
    }

    /* ツイートのUserID、時刻をWrapする枠 */
    .css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l[id^='id__'] > .css-1dbjc4n.r-18u37iz.r-1wbh5a2:not(:first-child) {
      margin-left: 4px;
      flex-grow: 1;
      justify-content: space-between;
    }

    /* 更にその子のUserID、時刻をWrapする枠 */
    .css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l[id^='id__'] > .css-1dbjc4n.r-18u37iz.r-1wbh5a2:not(:first-child) > div {
      flex-grow: 1;
      justify-content: space-between;
    }

    /* IDと時刻の間についてる『・』 */
    .css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l[id^='id__'] > .css-1dbjc4n.r-18u37iz.r-1wbh5a2:not(:first-child) > div > div:nth-child(2) {
      display: none;
    }

    /* 時刻 */
    .css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l[id^='id__'] > .css-1dbjc4n.r-18u37iz.r-1wbh5a2:not(:first-child) > div > div:nth-child(3) time {
      font-size: 12px;
    }

/* = ここから ツイートの横のメニューボタン = */
    .css-1dbjc4n.r-1uvorsx svg {
      color: transparent;
    }

    .css-1dbjc4n.r-1uvorsx::after {
      display: block;
      content: '📜';
      visibility: visible;
      margin-top: -18px;
    }

    /* r-1loqt21はポインタがカーソルになるやつ = ツイート詳細ではない画面に出てくるツイート */
    .r-1loqt21 .css-1dbjc4n.r-1uvorsx {
      position: absolute;
      margin-left: 0;
      top: 48px;
      left: -38px;
    }
/* = ここまで ツイートの横のメニューボタン = */
    `

    const styleElement = document.createElement("style");
    styleElement.textContent = style;
    document.body.appendChild(styleElement);
})();
