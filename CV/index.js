//Properties
const loadAnimationDuration = 2.5;

//Elements
const navbarElements = document.querySelectorAll("#main-logo, #main-nav li, #web-design-img");
const mainNav = document.getElementById("main-nav");
const tabsList = document.querySelector("#main-nav ul");
const burgerMenu = document.getElementById("burger-menu");
const burgerLine1 = document.getElementById("burger-line1");
const burgerLine2 = document.getElementById("burger-line2");
const burgerLine3 = document.getElementById("burger-line3");

const cvTab = document.getElementById("cv-tab");
const voirCV = document.getElementById("voir-cv");

let comeFromLeftElement = document.querySelector(".come-from-left");
let comeFromRightElement = document.querySelector(".come-from-right");

for (i = 0; i < navbarElements.length; i++) {
    var animationDuration = loadAnimationDuration + (i + 1) * 0.2;
    animationDuration = animationDuration.toString() + "s";
    navbarElements[i].style.animation = "popIn " + animationDuration + " forwards";
}

comeFromLeftElement.style.transform = "translateX(-100vw)";
comeFromRightElement.style.transform = "translateX(100vw)";

window.addEventListener("scroll", onScroll);

function onScroll() {
    if (window.scrollY > 0) {
        mainNav.style.marginTop = "0";
        comeFromLeft();
        comeFromRight();
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

function comeFromLeft() {
    if (comeFromLeftElement.getBoundingClientRect().top < window.scrollY - window.innerHeight / 2) {
        playAnimation("comeFromLeft");
    }
}

function comeFromRight() {
    if (comeFromRightElement.getBoundingClientRect().top < window.scrollY - window.innerHeight / 2) {
        playAnimation("comeFromRight");
    }
}

const playAll = () => {
    setTimeout(() => {
        playAnimation("comeFromLeft");
        playAnimation("comeFromRight");
    }, 800)
}

const playAnimation = (animation) => {
    switch (animation) {
        case 'comeFromLeft':
            comeFromLeftElement.style.animation = "comeFromLeft 0.75s forwards ease-in-out";
            comeFromLeftElement.style.transform = "translateX(0)";
            break;
        case 'comeFromRight':
            comeFromRightElement.style.animation = "comeFromRight 0.75s forwards ease-in-out";
            comeFromRightElement.style.transform = "translateX(0)";
            break;
    }
}

cvTab.addEventListener("click", playAll);
voirCV.addEventListener("click", playAll);