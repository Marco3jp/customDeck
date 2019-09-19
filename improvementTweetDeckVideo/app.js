// ==UserScript==
// @name         improvementTweetDeckVideo
// @namespace    https://marco.plus
// @version      1.0
// @description  Change to pure video element controller. You can play Picture-in-Picture, if you use supported browser.
// @author       Marco
// @match        https://twitter.com/i/videos/tweet/*
// @homepage     https://marco.plus
// @website      https://twitter.com/Marco_utau
// ==/UserScript==

(function () {
    'use strict';
    let videoMotherElm = document.querySelector("#video");
    let videoElm = videoMotherElm.querySelector("video");
    document.body.appendChild(videoElm);
    videoElm.controls = true;
    videoMotherElm.parentNode.removeChild(videoMotherElm);
})();
