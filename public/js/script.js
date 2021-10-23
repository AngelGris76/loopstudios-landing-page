"use strict";

const body = document.querySelector(".body");
const mainNavBar = document.querySelector(".mainnavbar");
const toggleMenuButton = document.querySelector(".togglemenubutton");
const mainMenu = document.querySelector(".mainmenu");
const mainMenuImg = toggleMenuButton.firstChild;

const mainMenuLinks = document.querySelectorAll(".mainmenu__link");
const firstFocusableElement = toggleMenuButton;
const lastFocusableElement = mainMenuLinks[mainMenuLinks.length - 1];

const changeBodyOverflow = () => {
  body.classList.toggle("show-menu");
};

const changeMenuButtonImg = () => {
  let imgSource = "";
  if (toggleMenuButton.ariaExpanded === "true") {
    imgSource = "assets/images/icon-close.svg";
  } else {
    imgSource = "assets/images/icon-hamburger.svg";
  }
  mainMenuImg.setAttribute("src", imgSource);
};

toggleMenuButton.addEventListener("click", () => {
  if (toggleMenuButton.ariaExpanded === "true") {
    mainMenu.classList.add("menu--translate");
  } else {
    mainMenu.classList.remove("menu--hide");
    setTimeout(() => mainMenu.classList.remove("menu--translate"), 100);
  }
});

mainMenu.addEventListener("transitionend", () => {
  if (toggleMenuButton.ariaExpanded === "false") {
    toggleMenuButton.ariaExpanded = "true";
  } else {
    toggleMenuButton.ariaExpanded = "false";
    mainMenu.classList.add("menu--hide");
  }
  changeMenuButtonImg();
  changeBodyOverflow();
});

mainNavBar.addEventListener("keydown", (e) => {
  console.log(e);
  if (toggleMenuButton.ariaExpanded === "true") {
    if (e.key === "Escape") toggleMenuButton.click();
    else if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement.focus();
      } else if (
        !e.shiftKey &&
        document.activeElement === lastFocusableElement
      ) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }
});
