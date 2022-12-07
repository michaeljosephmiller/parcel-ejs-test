"use strict";
document.addEventListener("DOMContentLoaded", async (event)=>{});
const navButton = document.querySelector(".mobile-nav-btn");
const primaryNavigation = document.querySelector(".primary-navigation");
navButton.addEventListener("click", ()=>{
    primaryNavigation.hasAttribute("data-visible") ? navButton.setAttribute("aria-expanded", false) : navButton.setAttribute("aria-expanded", true);
    primaryNavigation.toggleAttribute("data-visible");
});

