const mainNav = document.getElementById("main-nav");
const tabsList = document.querySelector("#main-nav ul");
const burgerMenu = document.getElementById("burger-menu");
const burgerLine1 = document.getElementById("burger-line1");
const burgerLine2 = document.getElementById("burger-line2");
const burgerLine3 = document.getElementById("burger-line3");
const coordToClipboard = document.getElementById("coord-to-clipboard");

window.addEventListener("scroll", onScroll);

function onScroll() {
    if (window.scrollY > 0) {
        mainNav.style.marginTop = "0";
    } else if (window.innerWidth > 600) {
        mainNav.style.marginTop = "3rem";
    }
}

let isMenuShow = false;
burgerMenu.addEventListener("click", onBurgerMenuClick);

function onBurgerMenuClick() {
    if (isMenuShow) {
        tabsList.style.transform = "translateX(0vw)";
        burgerLine1.style.transform = "rotateZ(0)";
        burgerLine2.style.transform = "scale(1)";
        burgerLine3.style.transform = "rotateZ(0)";
        burgerLine1.style.top = "0";
        burgerLine3.style.bottom = "0";
        isMenuShow = false;
    } else {
        tabsList.style.transform = "translateX(100vw)"
        burgerLine1.style.transform = "rotateZ(45deg)";
        burgerLine2.style.transform = "scale(0)";
        burgerLine3.style.transform = "rotateZ(-45deg)";
        burgerLine1.style.top = "40%";
        burgerLine3.style.bottom = "40%";
        isMenuShow = true;
    }
}