import {animateScroll as scroll} from "react-scroll";

const scrollToTopSmoothly = () => {
    scroll.scrollToTop({smooth: true});
};

const calculateAndSetNavHeight = (setNavHeight) => {
    const mainElement = document.getElementById('main');
    if (mainElement) {
        const elementHeight = mainElement.clientHeight;
        const androidStatusBarHeight = elementHeight - window.innerHeight;
        const navElement = document.getElementById('mainNav');

        if (navElement) {
            const navComputedStyles = getComputedStyle(navElement);
            const navHeight = parseFloat(navComputedStyles.height);
            const adjustedNavHeight = navHeight + 8 - androidStatusBarHeight;
            setNavHeight(adjustedNavHeight);
        }
    }
};

const scrollDownByNavHeight = (currentNavHeight) => {
  const windowHeight = window.innerHeight;
  scroll.scrollMore(windowHeight - currentNavHeight);
};

export {scrollToTopSmoothly, calculateAndSetNavHeight, scrollDownByNavHeight};
