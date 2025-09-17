'use strict';

/**
 * add event on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/**
 * navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () { 
  navbar.classList.toggle("active"); 
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () { 
  navbar.classList.remove("active"); 
}

addEventOnElem(navLinks, "click", closeNavbar);

/**
 * Smart header behavior with show/hide on scroll
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollY = window.scrollY;
let ticking = false;

const updateHeader = function() {
  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY;
  const scrolledPast = currentScrollY > 100;

  // Show/hide header based on scroll direction and position
  if (scrolledPast) {
    header.classList.add("active");
    
    if (scrollingDown && currentScrollY > 200) {
      // Hide header when scrolling down (after 200px)
      header.classList.add("hidden");
    } else if (!scrollingDown) {
      // Show header when scrolling up
      header.classList.remove("hidden");
    }
  } else {
    // At top of page
    header.classList.remove("active");
    header.classList.remove("hidden");
  }

  // Back to top button
  if (scrolledPast) {
    backTopBtn.classList.add("active");
  } else {
    backTopBtn.classList.remove("active");
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

const requestHeaderUpdate = function() {
  if (!ticking) {
    requestAnimationFrame(updateHeader);
    ticking = true;
  }
}

// Use throttled scroll event for better performance
window.addEventListener("scroll", requestHeaderUpdate, { passive: true });

// Handle window resize to reset scroll position tracking
window.addEventListener("resize", function() {
  lastScrollY = window.scrollY;
});

// Ensure header is visible when user stops scrolling (optional enhancement)
let scrollTimeout;
window.addEventListener("scroll", function() {
  // Clear the timeout if it exists
  clearTimeout(scrollTimeout);
  
  // Set a timeout to show header after user stops scrolling for 1.5 seconds
  scrollTimeout = setTimeout(function() {
    if (window.scrollY > 200) {
      header.classList.remove("hidden");
    }
  }, 1500);
}, { passive: true });